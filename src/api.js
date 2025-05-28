export class IrrigationAPI {
  constructor(baseUrl, username, password) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Rimuovi trailing slash
    this.auth = btoa(`${username}:${password}`);
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Basic ${this.auth}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Ottieni tutte le valvole
  async getValves() {
    return this.makeRequest('/api/valves');
  }

  // Ottieni una valvola specifica
  async getValve(valveId) {
    return this.makeRequest(`/api/valves/${valveId}`);
  }

  // Imposta stato valvola
  async setValveStatus(valveId, status, duration = null) {
    const data = { status };
    if (duration !== null) {
      data.duration = duration;
    }

    return this.makeRequest(`/api/valves/${valveId}/status`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Aggiorna programmazione
  async updateSchedule(valveId, day, schedule) {
    return this.makeRequest(`/api/valves/${valveId}/schedule/${day}`, {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
  }

  // Aggiorna nome valvola
  async updateValveName(valveId, name) {
    return this.makeRequest(`/api/valves/${valveId}/name`, {
      method: 'PUT',
      body: JSON.stringify({ name })
    });
  }

  // Reset override manuale
  async resetValve(valveId) {
    return this.makeRequest(`/api/valves/${valveId}/reset`, {
      method: 'POST'
    });
  }

  // Imposta skip next
  async setSkipNext(valveId, skip) {
    return this.makeRequest(`/api/valves/${valveId}/skip_next`, {
      method: 'POST',
      body: JSON.stringify({ skip })
    });
  }

  // Stato del sistema
  async getSystemStatus() {
    return this.makeRequest('/api/system/status');
  }

  // Riavvia sistema
  async restartSystem() {
    return this.makeRequest('/api/system/restart', {
      method: 'POST'
    });
  }

  // Ottieni versione
  async getVersion() {
    return this.makeRequest('/api/version');
  }
}
