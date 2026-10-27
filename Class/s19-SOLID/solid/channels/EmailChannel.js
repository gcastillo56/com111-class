import { INotificationChannel } from "../interfaces/INotificationChannel";

export class EmailChannel extends INotificationChannel {
  async send(recipient, payload) {
    console.log(`Sending Email to ${recipient}: ${payload.mailBody}`);
    return { success: true, channel: "Email" };
  }
}
