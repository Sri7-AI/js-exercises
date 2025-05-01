function calculateTemp(tempC) {
    console.log("This is the temp in Celsius:", tempC);
    let tempF;

    tempF = ((tempC * 1.8) + 32);
    console.log("This is the temperature in Fahrenheit: ", tempF);
    document.getElementById('new-temp').textContent = `Tempetaure in Fahrenheit: ${tempF} `;
    return tempF;
}

function formatUSD(price){

    let roundedPrice = Number.parseFloat(price).toFixed(2);
    console.log(roundedPrice);
    let stringPrice = roundedPrice.toString();
    console.log(stringPrice, typeof stringPrice);
    let formattedPrice = `$${stringPrice}`
    console.log(formattedPrice);

    document.getElementById('formatted-price').textContent= `Formatted price: ${formattedPrice}`;
    return toString;
}

function formatPct(percentage) {

    let roundedPercentage = (percentage * 100).toFixed(2);
    console.log(roundedPercentage);
    let stringPercentage = roundedPercentage.toString();
    console.log(stringPercentage, typeof stringPercentage);
    let formattedPercentage = `${stringPercentage}%`
    console.log(formattedPercentage);

    document.getElementById('formatted-percentage').textContent= `Formatted percentage: ${formattedPercentage}`;

}