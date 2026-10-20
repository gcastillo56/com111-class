// DO NOT USE IN PRODUCTION
import fs from 'fs';

export class AlertManager {
    constructor() {
        this.serviceName = "TelemetryAlertEngine";
    }

    async processSensorAlert(sensorData, channelType, recipient) {
        // 1. Validation Logic
        if (!sensorData || sensorData.reading > 100) {
            console.log("CRITICAL ALERT TRIGGERED!");
            
            // 2. Message Formatting Logic (Hardcoded HTML & Plaintext)
            let formattedMessage = `[ALERT] Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`;
            let htmlMessage = `<h1>Alert</h1><p>Sensor <b>${sensorData.id}</b> reached <i>${sensorData.reading}</i></p>`;

            // 3. Dispatch Logic (Violation of OCP - Adding new channels requires modifying this if/else block!)
            if (channelType === 'EMAIL') {
                console.log(`Sending Email to ${recipient}: ${htmlMessage}`);
            } else if (channelType === 'SMS') {
                console.log(`Sending SMS to ${recipient}: ${formattedMessage}`);
            } else if (channelType === 'SLACK') {
                console.log(`Posting to Slack channel ${recipient}: ${formattedMessage}`);
            } else {
                throw new Error("Unsupported channel type!");
            }

            // 4. File Logging Logic
            const logLine = `${new Date().toISOString()} - ${sensorData.id} - ${sensorData.reading}\n`;
            fs.appendFileSync('./alerts.log', logLine);

            // 5. Database Persistence Logic (Hardcoded direct DB query)
            console.log(`INSERT INTO alerts (sensor_id, reading) VALUES (${sensorData.id}, ${sensorData.reading})`);
        }
    }
}
