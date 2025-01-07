const temperatureConverter = {
  toCelsius: function (fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  },
  toFahrenheit: function (celsius) {
    return (celsius * 9 / 5) + 32;
  }
};

let tempValue = parseFloat(prompt("Enter the temperature value:"));
let unit = prompt("Is this in Celsius (C) or Fahrenheit (F)?").toUpperCase();

if (unit === 'C') {
  let fahrenheit = temperatureConverter.toFahrenheit(tempValue);
  console.log(`${tempValue}°C is equal to ${fahrenheit.toFixed(2)}°F.`);
} else if (unit === 'F') {
  let celsius = temperatureConverter.toCelsius(tempValue);
  console.log(`${tempValue}°F is equal to ${celsius.toFixed(2)}°C.`);
} else {
  console.log("Invalid unit! Please enter 'C' for Celsius or 'F' for Fahrenheit.");
}
