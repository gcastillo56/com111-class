// src/app.js - Enterprise Application Entry Point
import { AlertRepository } from "./repositories/AlertRepository.js";
import { AlertService } from "./services/AlertService.js";
import { ChannelFactory } from "./factories/ChannelFactory.js";

async function runDemo() {
  console.log("=================================================");
  console.log("🌱 SustainHub SOLID Alert System Initializing...");
  console.log("=================================================\n");

  // 1. Instantiate Dependencies (Injected at Runtime)
  const alertRepository = new AlertRepository();
  const alertService = new AlertService(alertRepository);

  // Simulated Telemetry Sensor Inputs
  const criticalReading = {
    id: 402,
    reading: 128.5,
    threshold: 100.0,
    unit: "ppm",
  };

  // 2. Dispatch via Email Strategy
  const emailChannel = ChannelFactory.createChannel("EMAIL");
  await alertService.processAlert(
    criticalReading,
    emailChannel,
    "operator@sustainhub.org",
  );

  console.log("\n-------------------------------------------------");

  // 3. Dispatch via SMS Strategy (Swapping strategies effortlessly!)
  const smsChannel = ChannelFactory.createChannel("SMS");
  await alertService.processAlert(
    criticalReading,
    smsChannel,
    "+1-555-019-2834",
  );

  console.log("\n-------------------------------------------------");

  // 4. Dispatch via Slack Strategy (Extended without modifying core logic!)
  const slackChannel = ChannelFactory.createChannel("SLACK");
  await alertService.processAlert(
    criticalReading,
    slackChannel,
    "channel-sustainhub",
  );

  console.log("\n=================================================");
  console.log("✅ Pipeline Execution Complete. All Principles Satisfied!");
  console.log("=================================================");
}

runDemo();
