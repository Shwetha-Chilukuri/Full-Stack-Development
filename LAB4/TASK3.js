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
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: 'rgb(22, 58, 218)',
          backgroundColor: 'rgba(4, 8, 206, 0.96)',
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
    const city = cityip.value;
    if (city) {
      getWeather(city);
    } else {
      alert("Please enter a city name.");
    }
});
})
// getWeather('Hyderabad')