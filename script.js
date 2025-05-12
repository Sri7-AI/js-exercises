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

document.addEventListener("DOMContentLoaded", function () {
  const formatDollar = p => `$${p.toFixed(2)}`;
  const urlProducts = 'https://raw.githubusercontent.com/prof-rossetti/intro-to-python/main/data/products.csv';

  d3.csv(urlProducts).then(data => {
    data.forEach(d => d.price = parseFloat(d.price));

    console.log('Total products:', data.length);

    data.forEach(d => console.log(d.name, '—', formatDollar(d.price)));

    const departments = Array.from(new Set(data.map(d => d.department)));
    console.log('Unique departments count:', departments.length);
    departments.forEach(dep => console.log(dep.toUpperCase()));

    const beverages = data.filter(d => d.department === 'beverages');
    console.log('Beverage products count:', beverages.length);
    console.log('Beverages array:', beverages);
    const avg = beverages.reduce((sum, d) => sum + d.price, 0) / beverages.length;
    console.log('Average beverage price:', formatDollar(avg));

    const ul = document.getElementById('display-groceries');
    data.sort((a, b) => a.name.localeCompare(b.name))
      .forEach(d => {
        const li = document.createElement('li');
        li.textContent = `${d.name} — ${formatDollar(d.price)}`;
        ul.appendChild(li);
      });
  }).catch(err => console.error(err));
})

const symbol = "NFLX";
const filename = `daily_adjusted_${symbol}.csv`;
const stockURL =
  `https://raw.githubusercontent.com/prof-rossetti/intro-software-dev-python-book/refs/heads/main/docs/data/${filename}`;

d3.csv(stockURL).then(data => {
  data.forEach(d => d.adjusted_close = +d.adjusted_close);

  const totalDays = data.length;
  console.log("Number of days:", totalDays);

  const latest = data[0];
  const earliest = data[totalDays - 1];

  console.log(
    "Earliest day:",
    earliest.timestamp,
    formatUSD(earliest.adjusted_close)
  );
  console.log(
    "Latest day:",
    latest.timestamp,
    formatUSD(latest.adjusted_close)
  );

  const change = (latest.adjusted_close - earliest.adjusted_close)
    / earliest.adjusted_close;
  console.log("Overall % change:", formatPct(change));

  document.getElementById("display-symbol").textContent = symbol;
  document.getElementById("display-earliest").textContent =
    `${earliest.timestamp} ${formatUSD(earliest.adjusted_close)}`;
  document.getElementById("display-latest").textContent =
    `${latest.timestamp} ${formatUSD(latest.adjusted_close)}`;
  document.getElementById("display-pct-change").textContent =
    formatPct(change);

}).catch(err => console.error("ERROR:", err));

const apiKey = prompt("Enter your AlphaVantage API key:");
const inputSymbol = document.getElementById("input-symbol");
const lookupButton = document.getElementById("lookup");
const displayName = document.getElementById("display-name");
const displayDescription = document.getElementById("display-description");
const displayLink = document.getElementById("display-link");

function lookupCompany() {
  const symbol = inputSymbol.value.trim().toUpperCase();
  console.log("SYMBOL:", symbol);

  const url =
    `https://www.alphavantage.co/query?function=OVERVIEW` +
    `&symbol=${symbol}&apikey=${apiKey}`;

  d3.json(url).then(data => {
    console.log("RESPONSE:", data);
    console.log("PART 1...");
    console.log("Name:", data.Name);
    console.log("Description:", data.Description);
    console.log("Website:", data.OfficialSite);

    displayName.textContent = data.Name || "N/A";
    displayDescription.textContent = data.Description || "N/A";
    if (data.OfficialSite) {
      displayLink.href = data.OfficialSite;
      displayLink.textContent = data.OfficialSite;
    } else {
      displayLink.href = "#";
      displayLink.textContent = "N/A";
    }
  })
    .catch(err => console.error("ERROR:", err));
}

lookupCompany();
lookupButton.addEventListener("click", lookupCompany);

const drinksURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

d3.json(drinksURL).then(data => {
  const drinks = data.drinks;
  console.log("Number of drinks:", drinks.length);
  drinks.forEach(d => console.log(d.strDrink, d.idDrink));

  document.getElementById("display-drinks-count").textContent = drinks.length;

  const container = document.getElementById("display-drinks");
  drinks.forEach(({ strDrink, strDrinkThumb }) => {
    const div = document.createElement("div");
    div.innerHTML = `
                    <p>${strDrink}</p>
                    <img src="${strDrinkThumb}" height="100" alt="${strDrink}">
                `;
    container.appendChild(div);
  });
})
  .catch(err => console.error(err));

const marketStatusURL = `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${apiKey}`;

d3.json(marketStatusURL).then(data => {
  const markets = data.markets || [];
  console.log("PART 1...");
  console.log("Total markets:", markets.length);

  const equityMarkets = markets.filter(m => m.market_type === "Equity");
  console.log("Equity markets:", equityMarkets.length);

  equityMarkets.forEach(m =>
    console.log(`• ${m.market_type} – ${m.region}`)
  );

  const usMarket = equityMarkets.find(m => m.region === "United States");
  if (!usMarket) {
    console.error("No United States equity market found");
    return;
  }

  const exchanges = usMarket.primary_exchanges
    .split(",")
    .map(s => s.trim());

  console.log("US market info:",
    `Type=${usMarket.market_type}`,
    `Exchanges=${exchanges.join(", ")}`,
    `Open=${usMarket.local_open}`,
    `Close=${usMarket.local_close}`,
    `Status=${usMarket.current_status.toUpperCase()}`
  );

  document.getElementById("display-region").textContent = usMarket.region;
  document.getElementById("display-type").textContent = usMarket.market_type;
  document.getElementById("display-exchanges").textContent = exchanges.join(", ");
  document.getElementById("display-open").textContent = usMarket.local_open;
  document.getElementById("display-close").textContent = usMarket.local_close;
  document.getElementById("display-status").textContent = usMarket.current_status.toUpperCase();
})
  .catch(err => console.error("Fetch error:", err));

var apiKeyStorage = sessionStorage.getItem("ALPHAVANTAGE_API_KEY")
if (!apiKeyStorage) {
  apiKeyStorage = prompt("Please enter your AlphaVantage API key:")
  sessionStorage.setItem("ALPHAVANTAGE_API_KEY", apiKeyStorage)
}

var cpiUrl = `https://www.alphavantage.co/query?function=CPI&apikey=${apiKeyStorage}`
console.log(cpiUrl)

d3.json(cpiUrl).then(function (parsedResponse) {
  console.log("RESPONSE:", parsedResponse)


}).catch(function (error) {
  console.error("ERROR:", error)
})

var fedRateURL = `https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=${apiKey}`
console.log(fedRateURL)

d3.json(fedRateURL).then(function (parsedResponse) {
  console.log("RESPONSE:", parsedResponse)

}).catch(function (error) {
  console.error("ERROR:", error)
})

var inflationURL = `https://www.alphavantage.co/query?function=INFLATION&apikey=${apiKey}`
console.log(inflationURL)

d3.json(inflationURL).then(function (parsedResponse) {
  console.log("RESPONSE:", parsedResponse)
}).catch(function (error) {
  console.error("ERROR:", error)
})

function updateDashboard() {
  console.log("--------------------")

  // capturing form inputs:
  var symbol = "NFLX" // TODO: get from drop-down instead
  console.log("SYMBOL:", symbol)

  var requestUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&datatype=csv&symbol=" + symbol + "&apikey=" + apiKey
  d3.csv(requestUrl).then(function (data) {
    console.log("DATA:", data)
  }).catch(function (err) {
    console.error("OOPS", err)
    alert("OOPS, please check your inputs and try again. For example, try using a premium API key.")
  })
}

var unemploymentURL = `https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=${apiKey}&datatype=csv`
d3.csv(unemploymentURL).then(function (data) {
  console.log("DATA:", data)
  // observe the rates are strings so we will need to convert them to numbers to do math and chart them

}).catch(function (error) {
  console.error("ERROR:", error)
})

var trainStations = [
  { abbrev: "GCS", name: "Grand Central Station", lat: 40.753165, lon: -73.977379, url: "https://www.mta.info/stations/grand-central-terminal" },
  { abbrev: "GW", name: "Greenwich", lat: 41.021705, lon: -73.624597, url: "https://www.mta.info/stations/greenwich" },
  { abbrev: "STM", name: "Stamford", lat: 41.04665375272103, lon: -73.54284524917603, url: "https://www.mta.info/stations/stamford" },
  { abbrev: "SN", name: "South Norwalk", lat: 41.095529, lon: -73.421803, url: "https://www.mta.info/stations/south-norwalk" },
  { abbrev: "BRP", name: "Bridgeport", lat: 41.17870242332479, lon: -73.18707704544067, url: "https://www.mta.info/stations/bridgeport" },
  { abbrev: "STR", name: "Stratford", lat: 41.19428563274378, lon: -73.13156604766846, url: "https://www.mta.info/stations/stratford" },
  { abbrev: "MIL", name: "Milford", lat: 41.223229872871606, lon: -73.05766582489014, url: "https://www.mta.info/stations/milford" },
  { abbrev: "WH", name: "West Haven", lat: 41.271408, lon: -72.964722, url: "https://www.mta.info/stations/west-haven" },

  { abbrev: "NHV", name: "New Haven Union Station", lat: 41.29771887088102, lon: -72.92673110961914, url: "https://shorelineeast.com/stations/union-station-new-haven/" },
  { abbrev: "ST", name: "New Haven State Street Station", lat: 41.3049849812806, lon: -72.92176365852356, url: "https://shorelineeast.com/stations/state-street-station-new-haven/" },
  { abbrev: "BRN", name: "Branford", lat: 41.27462757904543, lon: -72.81724601984024, url: "https://shorelineeast.com/stations/branford-station/" },
  { abbrev: "GUIL", name: "Guilford", lat: 41.275818924391224, lon: -72.6736432313919, url: "https://shorelineeast.com/stations/guilford-station/" },
  { abbrev: "MAD", name: "Madison", lat: 41.28366795570182, lon: -72.59953916072845, url: "https://shorelineeast.com/stations/madison-station/" },
  { abbrev: "CLIN", name: "Clinton", lat: 41.279485551365795, lon: -72.52829968929291, url: "https://shorelineeast.com/stations/clinton-station/" },
  { abbrev: "WES", name: "Westbrook", lat: 41.28876307212696, lon: -72.44840204715729, url: "https://shorelineeast.com/stations/westbrook-station/" },
  { abbrev: "OSB", name: "Old Saybrook", lat: 41.30039086249561, lon: -72.37682461738586, url: "https://shorelineeast.com/stations/old-saybrook-station/" },
  { abbrev: "NLC", name: "New London", lat: 41.354158032583534, lon: -72.0930764079094, url: "https://shorelineeast.com/stations/new-london-station/" },
]

//
// INITIALIZE MAP
//

var mapContainerId = 'my-map-container'
var latLonCoords = [41.29771887088102, -72.92673110961914]
var zoomLevel = 8

var map = L.map(mapContainerId)
  .setView(latLonCoords, zoomLevel)

//
// ADD MAP TILES
//

var tileUrlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
var tileLayerOptions = { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }

L.tileLayer(tileUrlTemplate, tileLayerOptions)
  .addTo(map);

var mapContainerId = 'my-map-container'
var latLonCoords = [41.29771887088102, -72.92673110961914]
var zoomLevel = 8

var map = L.map(mapContainerId)
  .setView(latLonCoords, zoomLevel)

//
// ADD MAP TILES
//

var tileUrlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
var tileLayerOptions = { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }

L.tileLayer(tileUrlTemplate, tileLayerOptions)
  .addTo(map)

//
// ADD MARKER(S) TO MAP
//

var station = {
  abbrev: "NHV",
  name: "New Haven Union Station",
  lat: 41.29771887088102,
  lon: -72.92673110961914,
  url: "https://shorelineeast.com/stations/union-station-new-haven/"
}


var stationPopup = `<b>${station.name}</b>`
stationPopup += "<br>"
stationPopup += "Some more content or context here."
stationPopup += "<br>"
stationPopup += `<a href='${station.url}'>See website for more information.</a>`

L.marker([station.lat, station.lon])
  .addTo(map)
  .bindPopup(stationPopup)


var trainStations = [
  { abbrev: "GCS", name: "Grand Central Station", lat: 40.753165, lon: -73.977379, url: "https://www.mta.info/stations/grand-central-terminal" },
  { abbrev: "GW", name: "Greenwich", lat: 41.021705, lon: -73.624597, url: "https://www.mta.info/stations/greenwich" },
  { abbrev: "STM", name: "Stamford", lat: 41.04665375272103, lon: -73.54284524917603, url: "https://www.mta.info/stations/stamford" },
  { abbrev: "SN", name: "South Norwalk", lat: 41.095529, lon: -73.421803, url: "https://www.mta.info/stations/south-norwalk" },
  { abbrev: "BRP", name: "Bridgeport", lat: 41.17870242332479, lon: -73.18707704544067, url: "https://www.mta.info/stations/bridgeport" },
  { abbrev: "STR", name: "Stratford", lat: 41.19428563274378, lon: -73.13156604766846, url: "https://www.mta.info/stations/stratford" },
  { abbrev: "MIL", name: "Milford", lat: 41.223229872871606, lon: -73.05766582489014, url: "https://www.mta.info/stations/milford" },
  { abbrev: "WH", name: "West Haven", lat: 41.271408, lon: -72.964722, url: "https://www.mta.info/stations/west-haven" },

  { abbrev: "NHV", name: "New Haven Union Station", lat: 41.29771887088102, lon: -72.92673110961914, url: "https://shorelineeast.com/stations/union-station-new-haven/" },
  { abbrev: "ST", name: "New Haven State Street Station", lat: 41.3049849812806, lon: -72.92176365852356, url: "https://shorelineeast.com/stations/state-street-station-new-haven/" },
  { abbrev: "BRN", name: "Branford", lat: 41.27462757904543, lon: -72.81724601984024, url: "https://shorelineeast.com/stations/branford-station/" },
  { abbrev: "GUIL", name: "Guilford", lat: 41.275818924391224, lon: -72.6736432313919, url: "https://shorelineeast.com/stations/guilford-station/" },
  { abbrev: "MAD", name: "Madison", lat: 41.28366795570182, lon: -72.59953916072845, url: "https://shorelineeast.com/stations/madison-station/" },
  { abbrev: "CLIN", name: "Clinton", lat: 41.279485551365795, lon: -72.52829968929291, url: "https://shorelineeast.com/stations/clinton-station/" },
  { abbrev: "WES", name: "Westbrook", lat: 41.28876307212696, lon: -72.44840204715729, url: "https://shorelineeast.com/stations/westbrook-station/" },
  { abbrev: "OSB", name: "Old Saybrook", lat: 41.30039086249561, lon: -72.37682461738586, url: "https://shorelineeast.com/stations/old-saybrook-station/" },
  { abbrev: "NLC", name: "New London", lat: 41.354158032583534, lon: -72.0930764079094, url: "https://shorelineeast.com/stations/new-london-station/" },

]

//
// INITIALIZE MAP
//

var mapContainerId = 'my-map-container'
var latLonCoords = [41.29771887088102, -72.92673110961914]
var zoomLevel = 8

var map = L.map(mapContainerId)
  .setView(latLonCoords, zoomLevel)

//
// ADD MAP TILES
//

var tileUrlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
var tileLayerOptions = { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }

L.tileLayer(tileUrlTemplate, tileLayerOptions)
  .addTo(map)

//
// ADD MARKER LAYER TO MAP:
//
var markersLayer = L.layerGroup().addTo(map)
