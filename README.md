# Irrigation Card

Una custom card per Home Assistant che permette di controllare un sistema di irrigazione tramite API HTTP.

![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## Caratteristiche

- 🌱 Controllo di multiple valvole di irrigazione
- ⏰ Visualizzazione programmazione settimanale
- 🔧 Controllo manuale con timer
- 📊 Monitoraggio stato sistema
- 🎨 Design responsive e moderno
- ⚙️ Configurazione tramite UI

## Screenshot

*Aggiungi qui uno screenshot della card in azione*

## Installazione

### Via HACS (Consigliato)

1. Assicurati di avere [HACS](https://hacs.xyz/) installato
2. Vai in HACS → Frontend
3. Clicca sui tre puntini in alto a destra → "Custom repositories"
4. Aggiungi questo repository: `https://github.com/TUOUSERNAME/irrigation-card`
5. Seleziona "Lovelace" come categoria
6. Clicca su "Add"
7. Cerca "Irrigation Card" e installala
8. Riavvia Home Assistant

### Installazione Manuale

1. Scarica `irrigation-card.js` dalla [pagina releases](https://github.com/TUOUSERNAME/irrigation-card/releases)
2. Copia il file nella cartella `config/www/` di Home Assistant
3. Aggiungi la risorsa in Configuration → Lovelace Dashboards → Resources:
   ```yaml
   url: /local/irrigation-card.js
   type: module
   ```
4. Riavvia Home Assistant

## Configurazione

### Configurazione tramite UI

1. Vai nel dashboard di Lovelace
2. Clicca su "Modifica dashboard"
3. Clicca su "Aggiungi card"
4. Cerca "Irrigation Card"
5. Compila i campi di configurazione

### Configurazione YAML

```yaml
type: custom:irrigation-card
url: https://192.168.1.100:5000
username: admin
password: password
title: Sistema Irrigazione
refresh_interval: 30
show_schedule: true
show_system_info: true
```

## Opzioni di Configurazione

| Opzione | Tipo | Richiesto | Default | Descrizione |
|---------|------|-----------|---------|-------------|
| `url` | string | Sì | - | URL del backend di irrigazione |
| `username` | string | Sì | - | Username per l'autenticazione |
| `password` | string | Sì | - | Password per l'autenticazione |
| `title` | string | No | "Sistema Irrigazione" | Titolo della card |
| `refresh_interval` | number | No | 30 | Intervallo di aggiornamento in secondi |
| `show_schedule` | boolean | No | true | Mostra la programmazione settimanale |
| `show_system_info` | boolean | No | true | Mostra informazioni di sistema |

## Funzionalità

### Controllo Valvole

- **Accendi**: Attiva una valvola con durata personalizzabile (1-60 minuti)
- **Spegni**: Disattiva immediatamente una valvola
- **Reset**: Rimuove l'override manuale e ripristina la programmazione automatica
- **Skip**: Salta la prossima accensione programmata

### Visualizzazione Programmazione

La card mostra per ogni valvola:
- Stato attuale (accesa/spenta)
- Indicatori di override manuale
- Programmazione settimanale con numero di accensioni per giorno

### Informazioni Sistema

- Stato di connessione
- Versione del backend
- Ultimo aggiornamento
- Numero di valvole attive

## Compatibilità Backend

Questa card è progettata per funzionare con il backend di irrigazione che utilizza le seguenti API:

- `GET /api/valves` - Lista valvole
- `POST /api/valves/{id}/status` - Controllo stato valvola
- `POST /api/valves/{id}/reset` - Reset valvola
- `POST /api/valves/{id}/skip_next` - Skip prossima accensione
- `GET /api/system/status` - Stato sistema

## Sviluppo

### Prerequisiti

- Node.js 18+
- npm o yarn

### Setup

```bash
git clone https://github.com/TUOUSERNAME/irrigation-card.git
cd irrigation-card
npm install
```

### Build

```bash
# Build di produzione
npm run build

# Build con watch per sviluppo
npm run watch
```

### Test

1. Copia `dist/irrigation-card.js` in `config/www/` di Home Assistant
2. Aggiungi la risorsa in Lovelace
3. Testa la card con il tuo backend

## Contribuire

1. Fork del repository
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## Supporto

Se riscontri problemi o hai suggerimenti:

1. Controlla le [Issues esistenti](https://github.com/TUOUSERNAME/irrigation-card/issues)
2. Apri una [nuova Issue](https://github.com/TUOUSERNAME/irrigation-card/issues/new)
3. Fornisci dettagli su configurazione e errori riscontrati

## Changelog

### v1.0.0
- Versione iniziale
- Controllo base valvole
- Visualizzazione programmazione
- Configurazione tramite UI
