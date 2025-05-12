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

const gb = {
  "downloadDate": "2021-06-05",
  "professorId": 123,
  "students": [
    { "studentId": 1, "name": "Student 1", "finalGrade": 76.7 },
    { "studentId": 2, "name": "Student 2", "finalGrade": 85.1 },
    { "studentId": 3, "name": "Student 3", "finalGrade": 50.3 },
    { "studentId": 4, "name": "Student 4", "finalGrade": 89.8 },
    { "studentId": 5, "name": "Student 5", "finalGrade": 97.4 },
    { "studentId": 6, "name": "Student 6", "finalGrade": 75.5 },
    { "studentId": 7, "name": "Student 7", "finalGrade": 87.2 },
    { "studentId": 8, "name": "Student 8", "finalGrade": 88.0 },
    { "studentId": 9, "name": "Student 9", "finalGrade": 93.9 },
    { "studentId": 10, "name": "Student 10", "finalGrade": 92.5 }
  ]
}

console.log("Download Date:", gb.downloadDate);
console.log("Student Count:", gb.students.length);
gb.students.forEach(s => console.log(s.name + ":", s.finalGrade));
const grades = gb.students.map(s => s.finalGrade);
console.log("Grades Array:", grades);
console.log("Average Grade:", d3.mean(grades).toFixed(2));
console.log("Median Grade:", d3.median(grades).toFixed(2));

window.onload = function () {
  const tbl = document.getElementById("display-gradebook");
  const hdr = tbl.insertRow();
  ["Student ID", "Student Name", "Final Grade"]
    .forEach(txt => {
      const th = document.createElement("th");
      th.textContent = txt;
      hdr.appendChild(th);
    });
  gb.students.forEach(({ studentId, name, finalGrade }) => {
    const row = tbl.insertRow();
    [studentId, name, finalGrade.toFixed(1)]
      .forEach(val => {
        const cell = row.insertCell();
        cell.textContent = val;
      });
  });
}

const products = [
  {
    "name": "Textbook",
    "description": "It has all the answers.",
    "price": 129.99,
    "imageURL": "https://picsum.photos/id/24/360/200"
  },
  {
    "name": "Cup of Tea",
    "description": "An individually-prepared tea or coffee of choice.",
    "price": 3.49,
    "imageURL": "https://picsum.photos/id/225/360/200"
  },
  {
    "name": "Strawberries",
    "description": "Juicy organic strawberries.",
    "price": 4.99,
    "imageURL": "https://picsum.photos/id/1080/360/200"
  }
];

console.log(`Total products: ${products.length}`);
products.forEach(({ name, price }) =>
  console.log(`${name}: $${price.toFixed(2)}`)
);
const matchingProducts = products.filter(p => p.price < 50);
console.log(`Matching products (< $50): ${matchingProducts.length}`);
console.log("matchingProducts array:", matchingProducts);

window.onload = function () {
  const container = document.getElementById("display-products");
  products.forEach(({ name, description, price, imageURL }) => {
    const prodDiv = document.createElement("div");
    prodDiv.innerHTML = `
                  <p>${name}</p>
                  <p>${description}</p>
                  <p>$${price.toFixed(2)}</p>
                  <img src="${imageURL}" alt="${name}">
                  <hr>
              `;
    container.appendChild(prodDiv);
  });
}

var trip = {
  "driver": {
    "first_name": "Danny",
    "last_name": "Dreyfus",
    "avg_rating": 3.6,
    "total_rides": 950
  },
  "vehicle": {
    "make": "Toyota",
    "model": "Prius",
    "year": 2021,
    "color": "silver",
    "licensePlate": "ABC-1234"
  },
  "rideshare": true,
  "pickup_location": "Union Station",
  "stops": [
    { "sequence": 1, "passenger": "Vishal", "destination": "Logan Circle", "fare": 5.99 },
    { "sequence": 2, "passenger": "Clara", "destination": "Dupont Circle", "fare": 7.99 },
    { "sequence": 3, "passenger": "Lee", "destination": "Washington Circle", "fare": 9.99 }
  ]
}

const tweets = [
  { id: 100200297, full_text: "Look at this delicious sandwich!", img_url: "https://sandwoah.com/sandwich.png", user: { screen_name: "sandwoah", followers: 5000 }, likes_count: 150 },
  { id: 100200298, full_text: "I love sandwiches", img_url: null, user: { screen_name: "user1", followers: 100 }, likes_count: 5 },
  { id: 100200299, full_text: "@sandwoah yumm...", img_url: null, user: { screen_name: "user2", followers: 200 }, likes_count: 10 },
  { id: 100200300, full_text: "@sandwoah that sandwich looks amazing!!", img_url: null, user: { screen_name: "user3", followers: 300 }, likes_count: 35 },
  { id: 100200301, full_text: "I ate a great sandwich today", img_url: null, user: { screen_name: "user4", followers: 400 }, likes_count: 50 }
];

console.log(tweets[0].user.screen_name);
tweets
  .filter(t => t.full_text.includes("@sandwoah"))
  .forEach(t => console.log(t.user.screen_name));
const tagged = tweets.filter(t => t.full_text.includes("@sandwoah"));
const topTaggedTweet = tagged.reduce((a, b) => b.likes_count > a.likes_count ? b : a);
console.log(topTaggedTweet.user.screen_name);

const sorted = [...tweets].sort((a, b) => b.likes_count - a.likes_count);

window.onload = function () {
  const tbl = document.getElementById("social-feed");
  tbl.innerHTML = `
            <tr>
              <th>Tweet Id</th>
              <th>Tweet Text</th>
              <th>User Screen Name</th>
              <th>User Followers</th>
              <th>Tweet Likes</th>
            </tr>
          ` + sorted.map(t => `
            <tr>
              <td>${t.id}</td>
              <td>${t.full_text}</td>
              <td>${t.user.screen_name}</td>
              <td>${t.user.followers}</td>
              <td>${t.likes_count}</td>
            </tr>
          `).join("");
}
const url = "https://httpbin.org/post";


const postData = {
  name: "Waldo Ma",
  email: "waldo@example.com",
  age: 75
}

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(postData)
})
  .then(response => {
    // Log the response so you can verify that the server received the data.
    console.log("SUCCESS!")
    console.log("Response:", response)
    // work with the response here



  })
  .catch(error => {
    console.error("Error in POST request:", error)
  })

const requestUrl = "https://raw.githubusercontent.com/prof-rossetti/internet-technologies/refs/heads/main/data/hp-movies.json";

fetch(requestUrl)
  .then(response => response.json())
  .then(function (movies) {

    console.log(`Number of movies: ${movies.length}`);

    movies.forEach(m => {
      console.log(`${m.Title} (${m.Year})`);
    });

    const top = movies.reduce((best, m) => m.Rating > best.Rating ? m : best, movies[0]);
    console.log(`Highest rated: ${top.Title} with rating ${top.Rating}`);

    const select = document.getElementById("select-movie");
    movies.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.Id;
      opt.textContent = m.Title;
      select.appendChild(opt);
    });

    function updateMovieInfo() {
      const id = select.value;
      const movie = movies.find(m => m.Id === id);
      if (!movie) return;
      document.getElementById("display-title").textContent = movie.Title;
      document.getElementById("display-year").textContent = movie.Year;
      document.getElementById("display-rating").textContent = movie.Rating;
      const imgCont = document.getElementById("image-container");
      imgCont.innerHTML = `<img src="${movie["Thumbnail Image URL"]}" alt="${movie.Title} poster">`;
    }

    select.addEventListener("change", updateMovieInfo);
  })
  .catch(err => console.error(err));

const degreeSymbol = "\u00B0";
const requestWeatherData = "https://raw.githubusercontent.com/prof-rossetti/internet-technologies/refs/heads/main/data/weather-data.json";

fetch(requestWeatherData)
  .then(resp => resp.json())
  .then(data => {
    console.log("DATA", data);

    const generatedAt = data.properties.generatedAt.slice(0, 10);
    console.log("Date generated:", generatedAt);
    const periods = data.properties.periods;
    console.log("Total periods:", periods.length);
    const daytimePeriods = periods.filter(p => p.isDaytime);
    console.log("Daytime periods count:", daytimePeriods.length);
    daytimePeriods.forEach(p => {
      console.log(
        `${p.name}: ${p.temperature}${degreeSymbol}${p.temperatureUnit} – ${p.shortForecast}`
      );
    });

    console.log("---------------------");
    console.log("PART 2...");
    document.getElementById("display-date").textContent = generatedAt;
    const table = document.getElementById("display-forecast");
    table.innerHTML = `
                    <tr>
                        <th>Period</th>
                        <th>Temperature</th>
                        <th>Forecast</th>
                        <th>Icon</th>
                    </tr>
                `;
    // B: insert one row per daytime period
    daytimePeriods.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${p.name}</td>
                        <td>${p.temperature}${degreeSymbol}${p.temperatureUnit}</td>
                        <td>${p.shortForecast}</td>
                        <td><img src="${p.icon}" alt="${p.shortForecast}" /></td>
                    `;
      table.appendChild(row);
    });
  })
  .catch(err => console.error(err));

