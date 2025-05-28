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
      lastUpdate: { type: Number },
      editingSchedule: { type: Object }, // { valveId: number, day: string }
      scheduleForm: { type: Object } // Form data per l'editing
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
    this.editingSchedule = null;
    this.scheduleForm = {};
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

      console.log('Loading data from:', this.config.url);
      
      const [valvesResponse, systemResponse] = await Promise.all([
        this.api.getValves(),
        this.api.getSystemStatus()
      ]);

      console.log('Valves response:', valvesResponse);
      console.log('System response:', systemResponse);

      this.valves = valvesResponse.data || [];
      this.systemStatus = systemResponse.data || null;
      this.lastUpdate = Date.now();
      
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        url: this.config.url
      });
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

  _openScheduleEditor(valveId, day) {
    const valve = this.valves.find(v => v.id === valveId);
    if (!valve) return;

    this.editingSchedule = { valveId, day };
    
    // Carica la programmazione esistente o crea una vuota
    const existingSchedule = valve.schedule[day] || [];
    this.scheduleForm = {
      schedules: existingSchedule.length > 0 ? 
        [...existingSchedule] : 
        [{ start_time: '06:00', duration: 10 }]
    };
  }

  _closeScheduleEditor() {
    this.editingSchedule = null;
    this.scheduleForm = {};
  }

  _addScheduleEntry() {
    if (!this.scheduleForm.schedules) this.scheduleForm.schedules = [];
    
    if (this.scheduleForm.schedules.length < 5) {
      this.scheduleForm.schedules.push({
        start_time: '06:00',
        duration: 10
      });
      this.requestUpdate();
    }
  }

  _removeScheduleEntry(index) {
    if (this.scheduleForm.schedules && this.scheduleForm.schedules.length > index) {
      this.scheduleForm.schedules.splice(index, 1);
      this.requestUpdate();
    }
  }

  _updateScheduleEntry(index, field, value) {
    if (this.scheduleForm.schedules && this.scheduleForm.schedules[index]) {
      this.scheduleForm.schedules[index][field] = field === 'duration' ? parseInt(value) : value;
      this.requestUpdate();
    }
  }

  async _saveSchedule() {
    if (!this.editingSchedule || !this.scheduleForm.schedules) return;

    try {
      // Valida i dati
      for (const entry of this.scheduleForm.schedules) {
        if (!entry.start_time || !entry.duration || entry.duration < 1 || entry.duration > 60) {
          this.error = 'Dati non validi: orario richiesto e durata 1-60 minuti';
          return;
        }
      }

      await this.api.updateSchedule(
        this.editingSchedule.valveId,
        this.editingSchedule.day,
        this.scheduleForm.schedules
      );
      
      await this._loadData();
      this._closeScheduleEditor();
      
    } catch (error) {
      console.error('Errore nel salvataggio della programmazione:', error);
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
                  ${this._getScheduleInfo(valve).map((day, index) => {
                    const dayName = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                    return html`
                      <span 
                        class="schedule-day ${day.hasSchedule ? '' : 'empty'}"
                        title="${day.hasSchedule ? `${day.count} accensioni - Clicca per modificare` : 'Nessuna programmazione - Clicca per aggiungere'}"
                        @click="${() => this._openScheduleEditor(valve.id, dayName)}"
                      >
                        ${day.name}${day.hasSchedule ? ` (${day.count})` : ''}
                      </span>
                    `;
                  })}
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

      ${this.editingSchedule ? html`
        <div class="schedule-editor-overlay" @click="${(e) => e.target === e.currentTarget && this._closeScheduleEditor()}">
          <div class="schedule-editor">
            <div class="schedule-editor-header">
              <h3 class="schedule-editor-title">
                Programmazione ${this.valves.find(v => v.id === this.editingSchedule.valveId)?.name} - 
                ${['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'][
                  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(this.editingSchedule.day)
                ]}
              </h3>
            </div>

            <div class="schedule-entries">
              ${this.scheduleForm.schedules?.map((entry, index) => html`
                <div class="schedule-entry">
                  <div class="schedule-entry-field">
                    <label class="schedule-entry-label">Orario</label>
                    <input 
                      type="time" 
                      class="schedule-entry-input"
                      .value="${entry.start_time}"
                      @input="${(e) => this._updateScheduleEntry(index, 'start_time', e.target.value)}"
                    />
                  </div>
                  <div class="schedule-entry-field">
                    <label class="schedule-entry-label">Durata (min)</label>
                    <input 
                      type="number" 
                      class="schedule-entry-input"
                      min="1" 
                      max="60"
                      .value="${entry.duration}"
                      @input="${(e) => this._updateScheduleEntry(index, 'duration', e.target.value)}"
                    />
                  </div>
                  <button 
                    class="schedule-entry-remove" 
                    @click="${() => this._removeScheduleEntry(index)}"
                    title="Rimuovi"
                  >
                    ×
                  </button>
                </div>
              `) || html`<div>Nessuna programmazione</div>`}
            </div>

            <div class="schedule-editor-actions">
              <button 
                class="add-schedule-btn"
                @click="${this._addScheduleEntry}"
                ?disabled="${(this.scheduleForm.schedules?.length || 0) >= 5}"
              >
                + Aggiungi orario
              </button>

              <div class="schedule-editor-buttons">
                <button class="btn btn-close" @click="${this._closeScheduleEditor}">
                  Annulla
                </button>
                <button class="btn btn-save" @click="${this._saveSchedule}">
                  Salva
                </button>
              </div>
            </div>
          </div>
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
