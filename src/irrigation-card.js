import { LitElement, html } from 'lit';
import { styles } from './styles.js';
import { IrrigationAPI } from './api.js';
import './editor.js';

class IrrigationCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      valves: { type: Array },
      systemStatus: { type: Object },
      loading: { type: Boolean },
      error: { type: String },
      lastUpdate: { type: Number }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.valves = [];
    this.systemStatus = null;
    this.loading = true;
    this.error = null;
    this.lastUpdate = 0;
    this.refreshInterval = null;
    this.api = null;
  }

  setConfig(config) {
    if (!config || !config.url || !config.username || !config.password) {
      throw new Error('La configurazione deve includere: url, username, password');
    }

    this.config = {
      refresh_interval: 30,
      show_schedule: true,
      show_system_info: true,
      ...config
    };

    // Inizializza API
    this.api = new IrrigationAPI(this.config.url, this.config.username, this.config.password);

    // Riavvia il refresh se la configurazione è cambiata
    this._setupRefresh();
    this._loadData();
  }

  static getConfigElement() {
    return document.createElement('irrigation-card-editor');
  }

  static getStubConfig() {
    return {
      url: 'https://192.168.1.100:5000',
      username: 'admin',
      password: 'password',
      title: 'Sistema Irrigazione',
      refresh_interval: 30,
      show_schedule: true,
      show_system_info: true
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupRefresh();
    if (this.api) {
      this._loadData();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearRefresh();
  }

  _setupRefresh() {
    this._clearRefresh();
    if (this.config && this.config.refresh_interval) {
      this.refreshInterval = setInterval(() => {
        this._loadData();
      }, this.config.refresh_interval * 1000);
    }
  }

  _clearRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  async _loadData() {
    if (!this.api) return;

    try {
      this.loading = true;
      this.error = null;

      const [valvesResponse, systemResponse] = await Promise.all([
        this.api.getValves(),
        this.api.getSystemStatus()
      ]);

      this.valves = valvesResponse.data || [];
      this.systemStatus = systemResponse.data || null;
      this.lastUpdate = Date.now();
      
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
      this.error = `Errore di connessione: ${error.message}`;
    } finally {
      this.loading = false;
    }
  }

  async _setValveStatus(valveId, status, duration = null) {
    try {
      await this.api.setValveStatus(valveId, status, duration);
      await this._loadData(); // Ricarica i dati
    } catch (error) {
      console.error('Errore nell\'impostazione dello stato:', error);
      this.error = `Errore: ${error.message}`;
    }
  }

  async _resetValve(valveId) {
    try {
      await this.api.resetValve(valveId);
      await this._loadData();
    } catch (error) {
      console.error('Errore nel reset della valvola:', error);
      this.error = `Errore: ${error.message}`;
    }
  }

  async _setSkipNext(valveId, skip) {
    try {
      await this.api.setSkipNext(valveId, skip);
      await this._loadData();
    } catch (error) {
      console.error('Errore nell\'impostazione skip next:', error);
      this.error = `Errore: ${error.message}`;
    }
  }

  _getDurationValue(valveId) {
    const input = this.shadowRoot.querySelector(`#duration-${valveId}`);
    return input ? parseInt(input.value) || 5 : 5;
  }

  _getScheduleInfo(valve) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    
    return days.map((day, index) => {
      const schedule = valve.schedule[day] || [];
      return {
        name: dayNames[index],
        hasSchedule: schedule.length > 0,
        count: schedule.length
      };
    });
  }

  _formatLastUpdate() {
    if (!this.lastUpdate) return '';
    const date = new Date(this.lastUpdate);
    return date.toLocaleTimeString();
  }

  render() {
    if (this.loading && !this.valves.length) {
      return html`
        <div class="loading">
          <div>Caricamento...</div>
        </div>
      `;
    }

    if (this.error && !this.valves.length) {
      return html`
        <div class="error-message">
          ${this.error}
          <button class="btn btn-secondary" @click="${this._loadData}" style="margin-top: 8px;">
            Riprova
          </button>
        </div>
      `;
    }

    return html`
      <div class="card-header">
        <h2 class="card-title">${this.config.title || 'Sistema Irrigazione'}</h2>
        ${this.config.show_system_info ? html`
          <div class="system-info">
            <span>
              <span class="status-indicator ${this.systemStatus ? 'status-online' : 'status-offline'}"></span>
              ${this.systemStatus ? 'Online' : 'Offline'}
            </span>
            ${this.systemStatus ? html`
              <span>v${this.systemStatus.version || 'N/A'}</span>
              <span>↻ ${this._formatLastUpdate()}</span>
            ` : ''}
          </div>
        ` : ''}
      </div>

      ${this.error ? html`
        <div class="error-message">
          ${this.error}
          <button class="btn btn-secondary" @click="${() => { this.error = null; this._loadData(); }}" style="margin-top: 8px;">
            Riprova
          </button>
        </div>
      ` : ''}

      <div class="valves-container">
        ${this.valves.map(valve => html`
          <div class="valve-card">
            <div class="valve-header">
              <div class="valve-name">${valve.name}</div>
              <div class="valve-status">
                <span class="status-indicator ${valve.status === 'on' ? 'status-online' : 'status-offline'}"></span>
                ${valve.status === 'on' ? 'Accesa' : 'Spenta'}
              </div>
            </div>

            <div class="valve-controls">
              <button 
                class="btn btn-success" 
                @click="${() => this._setValveStatus(valve.id, 'on', this._getDurationValue(valve.id))}"
                ?disabled="${valve.status === 'on'}"
              >
                🟢 Accendi
              </button>
              
              <button 
                class="btn btn-danger" 
                @click="${() => this._setValveStatus(valve.id, 'off')}"
                ?disabled="${valve.status === 'off'}"
              >
                🔴 Spegni
              </button>

              <button 
                class="btn btn-secondary" 
                @click="${() => this._resetValve(valve.id)}"
                ?disabled="${!valve.manual_override}"
              >
                🔄 Reset
              </button>

              <button 
                class="btn btn-warning" 
                @click="${() => this._setSkipNext(valve.id, !valve.skip_next)}"
                title="${valve.skip_next ? 'Riattiva prossima' : 'Salta prossima'}"
              >
                ${valve.skip_next ? '▶️ Riattiva' : '⏭️ Salta'}
              </button>
            </div>

            <div class="duration-input">
              <label for="duration-${valve.id}">Durata:</label>
              <input 
                type="number" 
                id="duration-${valve.id}" 
                min="1" 
                max="60" 
                value="5"
                title="Durata in minuti"
              />
              <span>min</span>
            </div>

            ${valve.manual_override || valve.skip_next ? html`
              <div class="valve-flags">
                ${valve.manual_override ? html`<span class="flag flag-override">Override Manuale</span>` : ''}
                ${valve.skip_next ? html`<span class="flag flag-skip">Salterà Prossima</span>` : ''}
              </div>
            ` : ''}

            ${this.config.show_schedule ? html`
              <div class="valve-schedule">
                <div class="schedule-title">Programmazione Settimanale</div>
                <div class="schedule-days">
                  ${this._getScheduleInfo(valve).map(day => html`
                    <span 
                      class="schedule-day ${day.hasSchedule ? '' : 'empty'}"
                      title="${day.hasSchedule ? `${day.count} accensioni` : 'Nessuna programmazione'}"
                    >
                      ${day.name}${day.hasSchedule ? ` (${day.count})` : ''}
                    </span>
                  `)}
                </div>
              </div>
            ` : ''}
          </div>
        `)}
      </div>

      ${this.valves.length === 0 ? html`
        <div class="loading">
          <div>Nessuna valvola trovata</div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('irrigation-card', IrrigationCard);

// Registra la card per l'editor di Lovelace
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'irrigation-card',
  name: 'Irrigation Card',
  preview: false,
  description: 'Card per il controllo del sistema di irrigazione'
});

console.info(
  `%c IRRIGATION-CARD %c v1.0.0 `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);
