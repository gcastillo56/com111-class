import { INotificationChannel } from "../interfaces/INotificationChannel";

export class SmsChannel extends INotificationChannel {
  async send(recipient, payload) {
    console.log(`Sending SMS to ${recipient}: ${payload.textBody}`);
    return { success: true, channel: "SMS" };
  }
}
