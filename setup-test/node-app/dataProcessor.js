function processVectorData(dataArray) {
  const normalized = [];

  for (let i = 0; i < dataArray.length; i++) {
    // Set Breakpoint #2 here to watch the loop variables
    const currentValue = dataArray[i];

    // Simulating some state adjustment or categorical jitter logic
    const adjustedValue = currentValue + Math.random() * 0.1;

    normalized.push(adjustedValue);
  }

  return normalized;
}

module.exports = { processVectorData };
