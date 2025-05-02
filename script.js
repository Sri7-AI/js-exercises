function calculateTemp(tempC) {
  console.log("This is the temp in Celsius:", tempC);
  let tempF;

  tempF = tempC * 1.8 + 32;
  console.log("This is the temperature in Fahrenheit: ", tempF);
  document.getElementById(
    "new-temp"
  ).textContent = `Tempetaure in Fahrenheit: ${tempF} `;
  return tempF;
}

function formatUSD(price) {
  let roundedPrice = Number.parseFloat(price).toFixed(2);
//   console.log(roundedPrice);
  let stringPrice = roundedPrice.toString();
//   console.log(stringPrice, typeof stringPrice);
  let formattedPrice = `$${stringPrice}`;
//   console.log(formattedPrice);

  document.getElementById(
    "formatted-price"
  ).textContent = `Formatted price: ${formattedPrice}`;
  return toString;
}

function formatPct(percentage) {
  let roundedPercentage = (percentage * 100).toFixed(2);
  console.log(roundedPercentage);
  let stringPercentage = roundedPercentage.toString();
  console.log(stringPercentage, typeof stringPercentage);
  let formattedPercentage = `${stringPercentage}%`;
  console.log(formattedPercentage);

  document.getElementById(
    "formatted-percentage"
  ).textContent = `Formatted percentage: ${formattedPercentage}`;
}

function calculateGroceryTotal(subtotal) {
  const taxRate = 0.0875;
  subtotal = parseFloat(subtotal);

  const rawTaxOwed = subtotal * taxRate;
  const taxOwed = Math.round(rawTaxOwed * 100) / 100;

  const rawTotal = subtotal + taxOwed;
  const total = Math.round(rawTotal * 100) / 100;

  const formattedTax = `$${taxOwed.toFixed(2)}`;
  const formattedTotal = `$${total.toFixed(2)}`;

  console.log("Tax Owed:", formattedTax);
  console.log("Total:", formattedTotal);

  document.getElementById("tax").textContent = `Tax Owed: ${formattedTax}`;
  document.getElementById("total").textContent = `Total: ${formattedTotal}`;
}

function generateReceipt(subtotal) {
  const taxRate = 0.0875;

  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  console.log("Subtotal:", formatUSD(subtotal));
  console.log("Tax Owed:", formatUSD(tax));
  console.log("Tax Rate:", formatPct(taxRate));
  console.log("Total:", formatUSD(total));

  return {
    subtotal,
    taxRate,
    tax,
    total,
  };
}

function checkUmbrella() {
  const isRaining = document.getElementById("isRaining").value === "true";
  const ownsUmbrella = document.getElementById("ownsUmbrella").value === "true";

  console.log("Is it raining?", isRaining);
  console.log("Do you own an umbrella?", ownsUmbrella);

  let message;

  if (!isRaining) {
    message = "Skies are clear";
  } else {
    message = ownsUmbrella ? "Bring your umbrella" : "Buy an umbrella";
  }

  console.log(message);
  document.getElementById("instruction").textContent = message;
}

function advise(isRaining, ownsUmbrella) {
  if (!isRaining) {
    return "Skies are clear";
  } else {
    return ownsUmbrella ? "Bring your umbrella" : "Buy an umbrella";
  }
}

function handleAdvice() {
  const isRaining = document.getElementById("isRaining").value === "true";
  const ownsUmbrella = document.getElementById("ownsUmbrella").value === "true";

  const message = advise(isRaining, ownsUmbrella);
  document.getElementById("result").textContent = message;

  console.log("Test 1 (raining, has umbrella):", advise(true, true)); // Bring your umbrella
  console.log("Test 2 (raining, no umbrella):", advise(true, false)); // Buy an umbrella
  console.log("Test 3 (not raining, has umbrella):", advise(false, true)); // Skies are clear
  console.log("Test 4 (not raining, no umbrella):", advise(false, false)); // Skies are clear
}

function yearsToMillion() {
    const formatUsd = (value) => `$${value.toFixed(2)}`;
  
    let initialBalance = 150000;
    const annualRate = 0.08;
    const targetBalance = 1000000;
  
    let currentBalance = initialBalance;
    let years = 0;
  
    while (currentBalance < targetBalance) {
      currentBalance += currentBalance * annualRate;
      years++;
    }
  
    const result = `
      Initial Investment: ${formatUsd(initialBalance)}<br>
      Years to reach $1M: ${years}<br>
      Ending Balance: ${formatUsd(currentBalance)}
    `;
  
    document.getElementById('years-output').innerHTML = result;
  
    console.log("Initial Investment:", formatUsd(initialBalance));
    console.log("Years to reach $1M:", years);
    console.log("Ending Balance:", formatUsd(currentBalance));
  }

  function simulateToMillion() {
    const formatUsd = (value) => `$${value.toFixed(2)}`;
    const formatPct = (value) => `${(value * 100).toFixed(2)}%`;
  
    const initialBalance = 150000;
    const target = 1000000;
  
    let currentBalance = initialBalance;
    let years = 0;
    let yearlyReturns = [];
  
    const randomReturn = d3.randomNormal(0.08, 0.15);
  
    while (currentBalance < target) {
      const rate = randomReturn();
      yearlyReturns.push(rate);
      currentBalance += currentBalance * rate;
      years++;
    }
  
    console.log("Initial Investment:", formatUsd(initialBalance));
    console.log("Years to reach $1M:", years);
    console.log("Ending Balance:", formatUsd(currentBalance));
    console.log("Yearly Returns:", yearlyReturns.map(r => formatPct(r)));
  
    const outputDiv = document.getElementById('simulate-output');
    outputDiv.innerHTML = `
      <strong>Initial Investment:</strong> ${formatUsd(initialBalance)}<br>
      <strong>Years to reach $1M:</strong> ${years}<br>
      <strong>Ending Balance:</strong> ${formatUsd(currentBalance)}<br><br>
      <strong>Yearly Return Rates:</strong><br>
      <ul>${yearlyReturns.map((r, i) => `<li>Year ${i + 1}: ${formatPct(r)}</li>`).join('')}</ul>
    `;
  }

  function runSimulation() {
    const formatUsd = (val) => `$${val.toFixed(2)}`;
    const formatPct = (val) => `${(val * 100).toFixed(2)}%`;
  
    // Get user inputs and convert
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);
    const targetBalance = parseFloat(document.getElementById('targetBalance').value);
    const mean = parseFloat(document.getElementById('meanReturn').value) / 100;
    const stdDev = parseFloat(document.getElementById('stdDev').value) / 100;
  
    // Create normal distribution generator
    const randomReturn = d3.randomNormal(mean, stdDev);
  
    let balance = initialBalance;
    let years = 0;
    const returnRates = [];
  
    // Simulate until target is reached
    while (balance < targetBalance) {
      const r = randomReturn();
      returnRates.push(r);
      balance += balance * r;
      years++;
    }
  
    // Log to console
    console.log("Initial:", formatUsd(initialBalance));
    console.log("Target:", formatUsd(targetBalance));
    console.log("Years:", years);
    console.log("Ending:", formatUsd(balance));
    console.log("Returns:", returnRates.map(formatPct));
  
    // Display in HTML
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = `
      <strong>Initial Balance:</strong> ${formatUsd(initialBalance)}<br>
      <strong>Target Balance:</strong> ${formatUsd(targetBalance)}<br>
      <strong>Years to Reach Target:</strong> ${years}<br>
      <strong>Ending Balance:</strong> ${formatUsd(balance)}<br><br>
      <strong>Yearly Return Rates:</strong>
      <ul>
        ${returnRates.map((r, i) => `<li>Year ${i + 1}: ${formatPct(r)}</li>`).join('')}
      </ul>
    `;
  }
