import { AlertFormatter } from "../formatters/AlertFormatter.js";

export class AlertService {
  /**
   * Dependency Injection via Constructor
   * @param {AlertRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Orchestrates alert evaluation, formatting, notification, and persistence.
   * @param {Object} sensorData
   * @param {INotificationChannel} notificationChannel
   * @param {string} recipient
   */
  async processAlert(sensorData, notificationChannel, recipient) {
    // 1. Evaluate Business Rules
    if (sensorData.reading <= sensorData.threshold) {
      console.log(
        `[AlertService] Sensor #${sensorData.id} reading normal (${sensorData.reading}). No alert needed.`,
      );
      return { triggered: false };
    }

    console.log(
      `\n🚨 [AlertService] Threshold Exceeded on Sensor #${sensorData.id}! Processing alert pipeline...`,
    );

    // 2. Prepare Standardized Payload (SRP via AlertFormatter)
    const payload = {
      title: `Sensor #${sensorData.id} Exceeded Limit`,
      textBody: AlertFormatter.formatText(sensorData),
      htmlBody: AlertFormatter.formatHtml(sensorData),
    };

    // 3. Dispatch Notification via Injected Abstraction (DIP & OCP)
    const dispatchResult = await notificationChannel.send(recipient, payload);

    // 4. Save Record to Database via Injected Repository (DIP & SRP)
    const savedRecord = await this.repository.save(sensorData);

    return {
      triggered: true,
      dispatchResult,
      savedRecord,
    };
  }
}
