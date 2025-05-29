import { LitElement, html, css } from 'lit';

export class IrrigationCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      availableValves: { type: Array },
      loading: { type: Boolean },
      connectionError: { type: String }
    };
  }

  static get styles() {
    return css`
      .config-section {
        margin-bottom: 16px;
      }

      .config-label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .config-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      .config-input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .config-description {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .config-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }

      .config-checkbox input {
        margin: 0;
      }

      .valves-selection {
        margin-top: 12px;
      }

      .valves-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 8px;
        margin-top: 8px;
      }

      .valve-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 6px;
        border: 1px solid var(--divider-color);
      }

      .valve-checkbox input {
        margin: 0;
      }

      .valve-checkbox label {
        font-size: 0.9em;
        color: var(--primary-text-color);
        cursor: pointer;
        flex: 1;
      }

      .loading-valves {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      .connection-error {
        background: var(--error-color);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.8em;
        margin-top: 8px;
      }

      .refresh-valves-btn {
        background: var(--primary-color);
        color: var(--text-primary-color);
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8em;
        margin-top: 8px;
      }
    `;
  }

  constructor() {
    super();
    this.availableValves = [];
    this.loading = false;
    this.connectionError = null;
  }

  setConfig(config) {
    this.config = { ...config };
    // Carica le valvole disponibili se abbiamo le credenziali
    if (config.url && config.username && config.password) {
      this._loadAvailableValves();
    }
  }

  async _loadAvailableValves() {
    if (!this.config.url || !this.config.username || !this.config.password) {
      return;
    }

    this.loading = true;
    this.connectionError = null;

    try {
      // Prova prima una richiesta diretta semplice per testare la connettività
      const testUrl = `${this.config.url.replace(/\/$/, '')}/api/system/status`;
      const auth = btoa(`${this.config.username}:${this.config.password}`);
      
      console.log('Testing connection to:', testUrl);
      
      const testResponse = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (!testResponse.ok) {
        throw new Error(`HTTP ${testResponse.status}: ${testResponse.statusText}`);
      }

      // Se il test funziona, carica le valvole
      const valvesUrl = `${this.config.url.replace(/\/$/, '')}/api/valves`;
      const valvesResponse = await fetch(valvesUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (!valvesResponse.ok) {
        throw new Error(`HTTP ${valvesResponse.status}: ${valvesResponse.statusText}`);
      }

      const valvesData = await valvesResponse.json();
      this.availableValves = valvesData.data || [];
      
      console.log('Loaded valves:', this.availableValves);
      
      // Se non ci sono valvole selezionate, seleziona tutte per default
      if (!this.config.selected_valves || this.config.selected_valves.length === 0) {
        this.config.selected_valves = this.availableValves.map(v => v.id);
        this._fireConfigChanged();
      }

    } catch (error) {
      console.error('Connection test failed:', error);
      
      // Se HTTPS fallisce, prova HTTP
      if (error.message.includes('Failed to fetch') && this.config.url.startsWith('https://')) {
        try {
          console.log('Trying HTTP fallback...');
          const httpUrl = this.config.url.replace('https://', 'http://');
          const auth = btoa(`${this.config.username}:${this.config.password}`);
          
          const httpResponse = await fetch(`${httpUrl}/api/valves`, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'omit'
          });

          if (!httpResponse.ok) {
            throw new Error(`HTTP ${httpResponse.status}: ${httpResponse.statusText}`);
          }

          const httpData = await httpResponse.json();
          this.availableValves = httpData.data || [];
          
          console.log('HTTP fallback successful, loaded valves:', this.availableValves);
          
          // Aggiorna l'URL nella configurazione per usare HTTP
          this.config.url = httpUrl;
          this._fireConfigChanged();
          
          // Se non ci sono valvole selezionate, seleziona tutte per default
          if (!this.config.selected_valves || this.config.selected_valves.length === 0) {
            this.config.selected_valves = this.availableValves.map(v => v.id);
            this._fireConfigChanged();
          }
          
        } catch (httpError) {
          console.error('HTTP fallback also failed:', httpError);
          this.connectionError = `Connessione fallita (HTTPS e HTTP): ${error.message}`;
          this.availableValves = [];
        }
      } else {
        this.connectionError = `Impossibile caricare le valvole: ${error.message}`;
        this.availableValves = [];
      }
    } finally {
      this.loading = false;
    }
  }

  _onValveSelectionChange(valveId, checked) {
    if (!this.config.selected_valves) {
      this.config.selected_valves = [];
    }

    if (checked) {
      if (!this.config.selected_valves.includes(valveId)) {
        this.config.selected_valves.push(valveId);
      }
    } else {
      this.config.selected_valves = this.config.selected_valves.filter(id => id !== valveId);
    }

    this._fireConfigChanged();
  }

  _selectAllValves() {
    this.config.selected_valves = this.availableValves.map(v => v.id);
    this._fireConfigChanged();
  }

  _selectNoValves() {
    this.config.selected_valves = [];
    this._fireConfigChanged();
  }

  _fireConfigChanged() {
    const event = new CustomEvent('config-changed', {
      detail: { config: { ...this.config } },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target;
    const configValue = target.type === 'checkbox' ? target.checked : target.value;

    if (this.config[target.id] === configValue) {
      return;
    }

    const newConfig = {
      ...this.config,
      [target.id]: configValue
    };

    // Rimuovi campi vuoti
    Object.keys(newConfig).forEach(key => {
      if (newConfig[key] === '' || newConfig[key] === null || newConfig[key] === undefined) {
        delete newConfig[key];
      }
    });

    this.config = newConfig;
    this._fireConfigChanged();

    // Se sono cambiate le credenziali, ricarica le valvole
    if (['url', 'username', 'password'].includes(target.id) && 
        this.config.url && this.config.username && this.config.password) {
      this._loadAvailableValves();
    }
  }

  render() {
    if (!this.config) {
      return html``;
    }

    return html`
      <div class="config-section">
        <label class="config-label" for="url">URL Backend</label>
        <input
          type="url"
          id="url"
          class="config-input"
          .value="${this.config.url || ''}"
          @input="${this._valueChanged}"
          placeholder="https://192.168.1.100:5000"
        />
        <div class="config-description">
          URL completo del tuo backend di irrigazione (incluso https:// e porta)
        </div>
      </div>

      <div class="config-section">
        <label class="config-label" for="username">Username</label>
        <input
          type="text"
          id="username"
          class="config-input"
          .value="${this.config.username || ''}"
          @input="${this._valueChanged}"
          placeholder="admin"
        />
        <div class="config-description">
          Nome utente per l'autenticazione al backend
        </div>
      </div>

      <div class="config-section">
        <label class="config-label" for="password">Password</label>
        <input
          type="password"
          id="password"
          class="config-input"
          .value="${this.config.password || ''}"
          @input="${this._valueChanged}"
          placeholder="password"
        />
        <div class="config-description">
          Password per l'autenticazione al backend
        </div>
        
        ${this.config.url && this.config.username && this.config.password ? html`
          <button 
            type="button"
            class="refresh-valves-btn" 
            @click="${this._loadAvailableValves}"
            style="margin-top: 8px;"
            ?disabled="${this.loading}"
          >
            ${this.loading ? '⏳ Testando...' : '🔗 Testa Connessione'}
          </button>
        ` : ''}
      </div>

      <div class="config-section">
        <label class="config-label" for="title">Titolo Card (opzionale)</label>
        <input
          type="text"
          id="title"
          class="config-input"
          .value="${this.config.title || ''}"
          @input="${this._valueChanged}"
          placeholder="Sistema Irrigazione"
        />
        <div class="config-description">
          Titolo personalizzato da mostrare nella card
        </div>
      </div>

      <div class="config-section">
        <label class="config-label" for="refresh_interval">Intervallo Aggiornamento (secondi)</label>
        <input
          type="number"
          id="refresh_interval"
          class="config-input"
          .value="${this.config.refresh_interval || 30}"
          @input="${this._valueChanged}"
          min="5"
          max="300"
          placeholder="30"
        />
        <div class="config-description">
          Frequenza di aggiornamento automatico (5-300 secondi)
        </div>
      </div>

      <div class="config-section">
        <div class="config-checkbox">
          <input
            type="checkbox"
            id="show_schedule"
            .checked="${this.config.show_schedule !== false}"
            @change="${this._valueChanged}"
          />
          <label for="show_schedule">Mostra programmazione valvole</label>
        </div>
        <div class="config-description">
          Mostra informazioni sulla programmazione settimanale delle valvole
        </div>
      </div>

      <div class="config-section">
        <div class="config-checkbox">
          <input
            type="checkbox"
            id="show_system_info"
            .checked="${this.config.show_system_info !== false}"
            @change="${this._valueChanged}"
          />
          <label for="show_system_info">Mostra informazioni sistema</label>
        </div>
        <div class="config-description">
          Mostra stato del sistema, versione e uptime
        </div>
      </div>

      <div class="config-section">
        <div class="config-checkbox">
          <input
            type="checkbox"
            id="use_http_fallback"
            .checked="${this.config.use_http_fallback === true}"
            @change="${this._valueChanged}"
          />
          <label for="use_http_fallback">Usa HTTP come fallback</label>
        </div>
        <div class="config-description">
          Se HTTPS fallisce, prova automaticamente HTTP (utile per app mobile)
        </div>
      </div>

      <div class="config-section">
        <div class="config-checkbox">
          <input
            type="checkbox"
            id="ignore_ssl_errors"
            .checked="${this.config.ignore_ssl_errors === true}"
            @change="${this._valueChanged}"
          />
          <label for="ignore_ssl_errors">Ignora errori SSL</label>
        </div>
        <div class="config-description">
          Ignora certificati SSL non validi (sconsigliato, solo per test)
        </div>
      </div>

      ${this.config.url && this.config.username && this.config.password ? html`
        <div class="config-section">
          <label class="config-label">Selezione Valvole</label>
          
          ${this.loading ? html`
            <div class="loading-valves">Caricamento valvole...</div>
          ` : ''}

          ${this.connectionError ? html`
            <div class="connection-error">
              ${this.connectionError}
              <button class="refresh-valves-btn" @click="${this._loadAvailableValves}">
                🔄 Riprova
              </button>
            </div>
          ` : ''}

          ${this.availableValves.length > 0 ? html`
            <div class="config-description" style="margin-bottom: 8px;">
              Seleziona le valvole da mostrare in questa card:
            </div>
            
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <button 
                type="button"
                class="refresh-valves-btn" 
                @click="${this._selectAllValves}"
                style="font-size: 0.7em; padding: 4px 8px;"
              >
                ✓ Tutte
              </button>
              <button 
                type="button"
                class="refresh-valves-btn" 
                @click="${this._selectNoValves}"
                style="font-size: 0.7em; padding: 4px 8px; background: var(--error-color);"
              >
                ✗ Nessuna
              </button>
              <button 
                type="button"
                class="refresh-valves-btn" 
                @click="${this._loadAvailableValves}"
                style="font-size: 0.7em; padding: 4px 8px;"
              >
                🔄 Aggiorna
              </button>
            </div>

            <div class="valves-grid">
              ${this.availableValves.map(valve => html`
                <div class="valve-checkbox">
                  <input
                    type="checkbox"
                    id="valve-${valve.id}"
                    .checked="${(this.config.selected_valves || []).includes(valve.id)}"
                    @change="${(e) => this._onValveSelectionChange(valve.id, e.target.checked)}"
                  />
                  <label for="valve-${valve.id}">
                    ${valve.name} (ID: ${valve.id})
                  </label>
                </div>
              `)}
            </div>

            <div class="config-description" style="margin-top: 8px;">
              ${(this.config.selected_valves || []).length} di ${this.availableValves.length} valvole selezionate
            </div>
          ` : ''}
        </div>
      ` : html`
        <div class="config-section">
          <div class="config-description" style="font-style: italic; color: var(--secondary-text-color);">
            💡 Inserisci URL, username e password per selezionare le valvole da mostrare
          </div>
        </div>
      `}
    `;
  }
}

customElements.define('irrigation-card-editor', IrrigationCardEditor);
