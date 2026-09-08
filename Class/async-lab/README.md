# Lab: Cascading Asynchronous Streams (Climate Analytics Dashboard)

### 🎯 Learning Objectives
By completing this laboratory exercise, you will demonstrate technical mastery over:
1. **The JavaScript Event Loop & Asynchrony:** Understanding how non-blocking I/O operations execute concurrently without freezing the main browser thread.
2. **ES6 Promises & Async/Await:** Writing clean, readable asynchronous code, initializing Promise-wrapped delays, and practicing proper error mitigation.
3. **Cascading Async Streams:** Orchestrating dependent asynchronous actions where the resolution of the second API request is conditionally governed by the payload of the first.
4. **JSON Serialization & Parsing:** Navigating structured data feeds and rendering complex objects dynamically to the DOM.

---

## 💻 The Scenario
You are building a client-side interface for **SustainHub**, an environmental telemetry platform. To make the interface interactive, you must build a dashboard that:
1. Dynamically fetches a list of active climate research scientists (**Stream 1**).
2. When a scientist is selected from a dropdown menu, triggers a dependent query (**Stream 2**) to fetch their specific carbon-offset telemetry records with a simulated network lag (1-second delay).
3. Renders a loading state to the user while Stream 2 resolves, demonstrating how to handle asynchronous layout updates in professional production environments.
