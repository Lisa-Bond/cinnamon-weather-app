let now = new Date();
let p = document.querySelector("p");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];
p.innerHTML = `${day}, ${month} ${date}, ${year} <br /> ${hours}:${minutes}`;
function searchCity(city) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert(`Please enter the location`);
  }
  let city = `${searchInput.value}`;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city-name");
  let h3 = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity-level");
  let wind = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  h1.innerHTML = response.data.name;
  h3.innerHTML = `${temperature}°C`;
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector(
    "#weather-symbol"
  ).innerHTML = `${response.data.weather[0].main}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}
function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
let celsiusTemperature = null;

searchCity("Kyiv");
displayForecast();

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHTML = `<div class="col">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   <ul class="list-group">
    <li class="list-group-item">${day} <br /><span class="weather-forecast-temperature-max">219° </span>
      <span class="weather-forecast-temperature-min"> 124°C </span>
      <img
        src="http://openweathermap.org/img/wn/50d@2x.png"
        alt=""
        width="25">
    </li>
  </ul>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
