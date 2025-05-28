import { LitElement, html, css } from 'lit';

export class IrrigationCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
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
    `;
  }

  setConfig(config) {
    this.config = { ...config };
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
    `;
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

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}

customElements.define('irrigation-card-editor', IrrigationCardEditor);
