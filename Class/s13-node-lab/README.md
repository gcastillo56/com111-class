## Building a Node.js Telemetry

**Objective:**
Build a command-line application using Node.js that harvests local machine stats (CPU model, total memory, uptime), fetches live environmental metrics from a public API, displays a formatted color audit in the terminal, and writes a permanent log file (`telemetry.log`) to disk.

**Requirements:**
1. Initialize a new Node.js project using `npm init -y` and set `"type": "module"` in `package.json`.
2. Install `chalk` (v5+) for styled console output and `axios` for HTTP requests.
3. Create an `.gitignore` file excluding `node_modules/`.
4. Use Node's built-in `os` and `fs/promises` modules to extract system specs and write disk logs.
5. Configure an NPM script `"start": "node index.js"` inside `package.json`.


---

### BASE CODE:

```javascript
// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
// TODO 2: Import third-party NPM packages (chalk)

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = "TODO";
        const freeMemMB = "TODO";
        const uptimeHours = "TODO";

        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform:")}      ${chalk.yellow(platform)}`);


        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB`;
        
        // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
        console.log("Writing log entry to disk...");

        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error("Telemetry report generation failed:", error.message);
    }
}

// Execute engine
generateTelemetryReport();
```
