const apiKey = '509a1d21ac348c5620ceba3e97585766';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}';

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const searchHistoryAside = document.getElementById('search-history');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
    cityInput.value = '';
  }
});

function getWeatherData(city) {
  const url = apiUrl.replace('${city}', city).replace('${apiKey}', apiKey);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentWeather = data.list[0];
      const forecast = data.list.slice(1, 6);

      renderCurrentWeather(currentWeather);
      renderForecast(forecast);
      addToSearchHistory(city);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function renderCurrentWeather(currentWeather) {
  currentWeatherSection.innerHTML = `
    <h2>Current Weather</h2>
    <p>City: ${currentWeather.name}</p>
    <p>Date: ${new Date(currentWeather.dt_txt).toLocaleDateString()}</p>
    <p>Temperature: ${currentWeather.main.temp} &#8451;</p>
    <p>Humidity: ${currentWeather.main.humidity}%</p>
    <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
  `;
}

function renderForecast(forecast) {
  forecastSection.innerHTML = `
    <h2>5-Day Forecast</h2>
    <ul>
      ${forecast.map((item) => `
        <li>
          <p>Date: ${new Date(item.dt_txt).toLocaleDateString()}</p>
          <p>Temperature: ${item.main.temp} &#8451;</p>
          <p>Humidity: ${item.main.humidity}%</p>
          <p>Wind Speed: ${item.wind.speed} m/s</p>
        </li>
      `).join('')}
    </ul>
  `;
}

function addToSearchHistory(city) {
  const listItem = document.createElement('li');
  listItem.textContent = city;
  searchHistoryAside.appendChild(listItem);

  listItem.addEventListener('click', () => {
    getWeatherData(city);
  });
}

function renderCurrentWeather(currentWeather) {
    const weatherIconClass = getWeatherIconClass(currentWeather.weather[0].icon);
  
    currentWeatherSection.innerHTML = `
      <h2>Current Weather</h2>
      <p>City: ${currentWeather.name}</p>
      <p>Date: ${new Date(currentWeather.dt_txt).toLocaleDateString()}</p>
      <p><i class="${weatherIconClass}"></i></p>
      <p>Temperature: ${currentWeather.main.temp} &#8451;</p>
      <p>Humidity: ${currentWeather.main.humidity}%</p>
      <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `;
  }
  
  function getWeatherIconClass(iconCode) {
    const iconMapping = {
      '01d': 'fas fa-sun',
      '01n': 'fas fa-moon',
      '02d': 'fas fa-cloud-sun',
      '02n': 'fas fa-cloud-moon',
      '03d': 'fas fa-cloud',
      '03n': 'fas fa-cloud',
      '04d': 'fas fa-cloud',
      '04n': 'fas fa-cloud',
      '09d': 'fas fa-cloud-showers-heavy',
      '09n': 'fas fa-cloud-showers-heavy',
      '10d': 'fas fa-cloud-rain',
      '10n': 'fas fa-cloud-rain',
      '11d': 'fas fa-bolt',
      '11n': 'fas fa-bolt',
      '13d': 'fas fa-snowflake',
      '13n': 'fas fa-snowflake',
      '50d': 'fas fa-smog',
      '50n': 'fas fa-smog'
    };
  
    return iconMapping[iconCode] || 'fas fa-question';
  }
  