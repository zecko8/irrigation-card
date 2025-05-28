# Irrigation Card

Una custom card per Home Assistant che permette di controllare un sistema di irrigazione tramite API HTTP.

## Funzionalità Principali

- ✅ **Controllo Valvole**: Accendi/spegni valvole con timer personalizzabili
- ✅ **Programmazione**: Visualizza la programmazione settimanale di ogni valvola  
- ✅ **Override Manuale**: Controllo manuale con possibilità di reset automatico
- ✅ **Skip Programmazione**: Salta la prossima accensione programmata
- ✅ **Monitoraggio Sistema**: Stato del backend, versione, uptime
- ✅ **Design Responsive**: Si adatta a schermi desktop e mobile
- ✅ **Configurazione UI**: Setup facile tramite interfaccia grafica

## Requisiti

- Home Assistant
- Backend di irrigazione compatibile con API REST
- HTTPS configurato sul backend (raccomandato)

## Configurazione Rapida

1. Installa tramite HACS
2. Aggiungi la card al tuo dashboard
3. Configura:
   - URL del tuo backend (es: `https://192.168.1.100:5000`)
   - Username e password
   - Opzioni di visualizzazione

## Esempio Configurazione

```yaml
type: custom:irrigation-card
url: https://192.168.1.100:5000
username: admin
password: your_password
title: Giardino - Irrigazione
refresh_interval: 30
```

La card si aggiorna automaticamente e mostra lo stato in tempo reale di tutte le valvole del sistema.
