// debug-test.js
console.log("Starting debugging test...");

function processData(items) {
  const processed = [];

  for (let i = 0; i < items.length; i++) {
    // A great place to set a breakpoint is on the line below!
    const multiplier = i + 1;
    const result = items[i] * multiplier;

    processed.push(result);
  }

  return processed;
}

const rawData = [10, 20, 30];
const finalData = processData(rawData);

console.log("Final processed data:", finalData);
console.log("Debugging test finished.");
