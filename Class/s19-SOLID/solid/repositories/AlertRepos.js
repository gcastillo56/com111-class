import fs from "fs";

export class AlertRepository {
  async save(sensorData) {
    // { id: 1234, reading: 98, source: 'roof' }
    console.log(
      `INSERT INTO alerts (sensor_id, reading) VALUES (${sensorData.id}, ${sensorData.reading})`,
    );
    return { id: Date.now(), ...sensorData, savedAt: new Date() };
    // {id: DATE, sensorData: { id: 1234, reading: 98, source: 'roof' }, savedAt: DATE}
    // {id: DATE, id: 1234, reading: 98, source: 'roof', savedAt: DATE}
  }

  saveToFile(sensorData) {
    const logLine = `${new Date().toISOString()} - ${sensorData.id} - ${sensorData.reading}\n`;
    fs.appendFileSync("./alerts.log", logLine);
  }
}
