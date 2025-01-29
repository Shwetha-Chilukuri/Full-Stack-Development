const cityip = document.querySelector('#cityInput')
const fetchbtn = document.querySelector('#fetchWeatherBtn')
document.addEventListener('DOMContentLoaded', function() {
async function getWeather(city){
    const apiKey = '5e506310f4547561e3107ac17919ff73'
    let rawData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&units=metric&appid=${apiKey}`)
    let data = await rawData.json()
    const dates = [];
    const temps = [];
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString();
        dates.push(day);
        temps.push(item.main.temp);
    });
    displayChart(dates, temps);
}
function displayChart(dates,temperatures){
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const weatherChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: dates,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
}
fetchbtn.addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
      getWeather(city);
    } else {
      alert("Please enter a city name.");
    }
});
})
// getWeather('Hyderabad')