// DOM Selectors
const selector = document.getElementById('scientist-selector');
const display = document.getElementById('results-display');

// TODO 1: Initialize Stream 1 (Fetch and render Scientist Registry to Dropdown)
async function fetchScientists() {
    try {
        // TODO: Use native fetch() to retrieve 'scientists.json'
        // TODO: Parse the response payload into a JS array
        // TODO: Map the array into <option> tags and load them inside the 'selector' DOM element
    } catch (error) {
        console.error("Stream 1 Failed:", error);
        selector.innerHTML = `<option value="">Error loading scientists</option>`;
    }
}

// TODO 2: Initialize Simulated Delayed Fetch (Stream 2 - Promise Wrapper)
// This function must return a Promise that resolves after a 1000ms delay to simulate network latency.
function simulateNetworkLag(ms) {
    // TODO: Return a new Promise resolving via a setTimeout callback
}

// TODO 3: Fetch metrics and filter by Scientist ID (Stream 2)
async function fetchMetricsForScientist(scientistId) {
    try {
        // Render the loading state first
        display.innerHTML = `
            <div class="d-flex flex-column align-items-center">
                <div class="spinner-border text-success mb-2" role="status"></div>
                <span class="text-muted small">Accessing cloud telemetry database... Please wait...</span>
            </div>
        `;

        // TODO: Await the simulated network latency (1000ms) to witness the loading spinner
        
        // TODO: Fetch 'metrics.json'
        
        // TODO: Filter the fetched metrics array where 'scientistId' matches the input parameter
        
        // TODO: Render the final metrics list inside 'display'
        // Handle the edge case where a selected scientist has 0 logged metrics!
        
    } catch (error) {
        console.error("Stream 2 Failed:", error);
        display.innerHTML = `<div class="alert alert-danger mb-0">Error fetching climate telemetry: ${error.message}</div>`;
    }
}

// TODO 4: Event Observer (Wiring the Cascading Trigger)
selector.addEventListener('change', (event) => {
    const selectedId = event.target.value;
    
    if (!selectedId) {
        display.innerHTML = `<p class="text-muted mb-0">Please select a research director from the registry above.</p>`;
        return;
    }

    // TODO: Execute the dependent Stream 2 request
});

// Initialize App on Page Mount
fetchScientists();