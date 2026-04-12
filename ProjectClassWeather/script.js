const API_KEY = 'c3b944af7de66b5cc7ca413c277bf4b7';
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

// Get ref from DOM elements.
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessageEl = document.getElementById('errorMessage');
const weatherInfo = document.getElementById('weatherInfo');
const cityNameEl = document.getElementById('cityName');
const tempEl = document.getElementById('temp');
const descriptionEl = document.getElementById('description');
const feelsLikeEl = document.getElementById('feelslike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const pressureEl = document.getElementById('pressure');

async function parseApiError(response) {
  try {
    const errorData = await response.json();

    if (errorData.cod && errorData.message) {
      return errorData.message;
    }

    return `Error ${errorData.cod || response.status}: ${errorData.message || response.statusText}`
  } catch (error) {
    return `Error ${response.status}: ${response.statusText}`
  }
}

function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove('hidden');
  weatherInfo.classList.add('hidden');
}

function hideError() {
  errorMessageEl.textContent = '';
  errorMessageEl.classList.add('hidden');
}

function displayWeather(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = Math.round(data.main.temp);
  descriptionEl.textContent = data.weather[0].description;
  feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windSpeedEl.textContent = `${data.wind.speed} m/s`;
  pressureEl.textContent = `${data.main.pressure} hPa`;

  weatherInfo.classList.remove('hidden');
}

async function fetchWeather(cityName) {
  if (!cityName || cityName.trim() === '') {
    return;
  }

  hideError();

  try {
    const weatherURL = `${API_ENDPOINT}?q=${cityName.trim()}&appid=${API_KEY}&units=metric`;
    const response = await fetch(weatherURL);

    if (!response.ok) {
      const errorMessage = await parseApiError(response);

      if (response.status === 401) {
        throw new Error('Invalid API Key');
      } else if (response.status === 404) {
        throw new Error('City not found');
      } else if (response.status === 429) {
        throw new Error('Too many requests! Please wait for a while and try again.');
      } else if (response.status >= 500) {
        throw new Error('Weather service is temporarily unavailable. Please try again later.');
      } else {
        throw new Error(errorMessage);
      }
    }

    const weatherData = await response.json();
    displayWeather(weatherData);

  } catch (error) {
    if (error.name === 'TypeError') {
      showError('Network error! Please check your internet connection and try again.');
    } else if (error.name === 'TimeoutError') {
      showError('Request timed out. Please try again.');
    } else {
      showError(error.message || 'An unexpected error occurred. Please try again later.');
    }
  }
}

// Event listeners
searchBtn.addEventListener('click', () => {
  fetchWeather(cityInput.value);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    fetchWeather(cityInput.value);
  }
});

cityInput.addEventListener('input', () => {
  if (cityInput.value.trim() === '') {
    weatherInfo.classList.add('hidden');
  }
});