export class AlertFormatter {
  static formatText(sensorData) {
    return `[ALERT] Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`;
  }

  static formatHtml(sensorData) {
    return `
            <div style="border: 2px solid red; padding: 15px; font-family: sans-serif;">
                <h2 style="color: red;">🚨 SustainHub Critical Alert</h2>
                <p>Sensor ID: <strong>${sensorData.id}</strong></p>
                <p>Recorded Value: <strong>${sensorData.reading}</strong></p>
                <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
        `;
  }

  static formatSocialMedia(sensorData) {}
}
