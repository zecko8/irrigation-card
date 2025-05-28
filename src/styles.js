import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: 16px;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, none);
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--divider-color);
  }

  .card-title {
    font-size: 1.2em;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .system-info {
    display: flex;
    gap: 12px;
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
  }

  .status-online {
    background-color: var(--success-color, #4caf50);
  }

  .status-offline {
    background-color: var(--error-color, #f44336);
  }

  .valves-container {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .valve-card {
    background: var(--secondary-background-color);
    border-radius: 8px;
    padding: 16px;
    border: 1px solid var(--divider-color);
  }

  .valve-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .valve-name {
    font-weight: 500;
    color: var(--primary-text-color);
    font-size: 1em;
  }

  .valve-status {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .valve-controls {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .btn {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8em;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }

  .btn-success {
    background: var(--success-color, #4caf50);
    color: white;
  }

  .btn-danger {
    background: var(--error-color, #f44336);
    color: white;
  }

  .btn-secondary {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  .btn-warning {
    background: var(--warning-color, #ff9800);
    color: white;
  }

  .valve-schedule {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color);
  }

  .schedule-title {
    font-size: 0.8em;
    font-weight: 500;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .schedule-days {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .schedule-day {
    background: var(--primary-color);
    color: var(--text-primary-color);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .schedule-day:hover {
    background: var(--primary-color-dark, var(--primary-color));
    transform: translateY(-1px);
  }

  .schedule-day.empty {
    background: var(--disabled-color, #ccc);
    color: var(--secondary-text-color);
  }

  .schedule-day.empty:hover {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }

  .error-message {
    background: var(--error-color);
    color: white;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    font-size: 0.9em;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: var(--secondary-text-color);
  }

  .duration-input {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .duration-input input {
    width: 60px;
    padding: 4px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  .duration-input label {
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .valve-flags {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }

  .flag {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 500;
  }

  .flag-override {
    background: var(--warning-color, #ff9800);
    color: white;
  }

  .flag-skip {
    background: var(--info-color, #2196f3);
    color: white;
  }

  @media (max-width: 600px) {
    .valves-container {
      grid-template-columns: 1fr;
    }
    
    .valve-controls {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
    }
  }

  /* Stili per l'editor di programmazione */
  .schedule-editor-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .schedule-editor {
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: 12px;
    padding: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .schedule-editor-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  .schedule-editor-title {
    font-size: 1.1em;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .schedule-entries {
    margin: 16px 0;
  }

  .schedule-entry {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--secondary-background-color);
    border-radius: 8px;
    margin-bottom: 8px;
  }

  .schedule-entry-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .schedule-entry-label {
    font-size: 0.8em;
    color: var(--secondary-text-color);
    font-weight: 500;
  }

  .schedule-entry-input {
    padding: 6px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--ha-card-background, white);
    color: var(--primary-text-color);
    font-size: 0.9em;
  }

  .schedule-entry-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .schedule-entry-remove {
    background: var(--error-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
  }

  .schedule-editor-actions {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--divider-color);
  }

  .add-schedule-btn {
    background: var(--success-color);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .add-schedule-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .schedule-editor-buttons {
    display: flex;
    gap: 8px;
  }

  .btn-close {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  .btn-save {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }
`;
