function calculateTemp(tempC) {
    console.log("This is the temp in Celsius:", tempC);
    let tempF;

    tempF = ((tempC * 1.8) + 32);
    console.log("This is the temperature in Fahrenheit: ", tempF);
    document.getElementById('result').textContent = `Tempetaure in Fahrenheit: ${tempF} `;
    return tempF;
}