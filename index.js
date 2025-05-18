document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const cityButton = document.getElementById("search-button");
  const weatherInfo = document.getElementById("weathe-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("weather-data");
  const descriptionDisplay = document.getElementById("discription");
  const errorMessage = document.getElementById("error-messege");
  const loader = document.getElementById("loader");
  const feelsDisplay = document.getElementById("feels");
  const humidityDisplay = document.getElementById("humidity");
  const windDisplay = document.getElementById("wind");
  const cloudsDisplay = document.getElementById("clouds");
  const highlights = document.getElementById("highlights");
  const sunriseDisplay = document.getElementById("sunrise");
  const sunsetDisplay = document.getElementById("sunset");
  const visibilityDisplay = document.getElementById("visibility");


  function showWelcomeContent() {
    weatherInfo.classList.remove("hidden");
    highlights.classList.remove("hidden");
    
    cityNameDisplay.innerHTML = `
      <img src="https://unpkg.com/feather-icons@4.29.2/dist/icons/cloud.svg"
           alt="Cloud icon"
           width="30" height="40"
           style="filter: invert(1); " />
      Welcome to Weather App
    `;
    
    temperatureDisplay.innerHTML = `Enter a city name above to get started`;
    descriptionDisplay.textContent = `Get real-time weather information for any city`;
    
    feelsDisplay.textContent = `Feels Like: --°C`;
    humidityDisplay.textContent = `Humidity: --%`;
    windDisplay.textContent = `Wind: -- m/s`;
    cloudsDisplay.textContent = `Clouds: --%`;
    sunriseDisplay.textContent = `Sunrise: --:--`;
    sunsetDisplay.textContent = `Sunset: --:--`;
    visibilityDisplay.textContent = `Visibility: -- km`;
  }

  showWelcomeContent();

  const API_KEY = "7355047791d3b82d064f10b72b92a673";

  cityButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") return;

    errorMessage.classList.add("hidden");
    loader.classList.remove("hidden");

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    } finally {
      loader.classList.add("hidden");
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather, wind, clouds, sys, visibility } = data;

    cityNameDisplay.innerHTML = `
      <img src="https://unpkg.com/feather-icons@4.29.2/dist/icons/map-pin.svg"
          alt="Location icon"
          width="30" height="40"
          style="margin-right: 14px; filter: invert(1); margin-top:10px" />
      ${name}
    `;

    temperatureDisplay.innerHTML = `Temperature: ${main.temp} 
      <svg width="50px" height="20px" viewBox="0 0 50 24" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="20" font-size="18" fill="white">°C</text>
      </svg>`;
    
    descriptionDisplay.textContent = `Weather: "${weather[0].description}"`;
    
    // Format sunrise and sunset times
    const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Update the highlights section
    highlights.classList.remove("hidden");
    feelsDisplay.textContent = `Feels Like: ${main.feels_like}°C`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
    windDisplay.textContent = `Wind: ${wind.speed} m/s`;
    cloudsDisplay.textContent = `Clouds: ${clouds.all}%`;
    sunriseDisplay.textContent = `Sunrise: ${sunriseTime}`;
    sunsetDisplay.textContent = `Sunset: ${sunsetTime}`;
    visibilityDisplay.textContent = `Visibility: ${(visibility/1000).toFixed(1)} km`;
    
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    // loader.classList.add("hidden");
    cityNameDisplay.innerHTML = "";
    temperatureDisplay.innerHTML = "";
    descriptionDisplay.textContent = "";
    feelsDisplay.textContent = "";
    humidityDisplay.textContent = "";
    windDisplay.textContent = "";
    cloudsDisplay.textContent = "";
    sunriseDisplay.textContent = "";
    sunsetDisplay.textContent = "";
    visibilityDisplay.textContent = "";
    highlights.classList.add("hidden");
  }
});