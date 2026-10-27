import { SmsChannel } from "../channels/SmsChannel";
import { EmailChannel } from "../channels/EmailChannel";

export class ChannelFactory {
  static createChannel(type) {
    switch (type) {
      case "SMS":
        return new SmsChannel();
      case "EMAIL":
        return new EmailChannel();
      default:
        throw new Error("Unsupported channel type!");
    }
  }
}
