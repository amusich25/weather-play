function formatDay(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let now = new Date();    
  let day = days[now.getDay()];
      return `${day}`
};

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

function formatDate(date) {
  let now = new Date();
    let numberDate = now.getDate();
      
      let year = now.getFullYear();

      let months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = months[now.getMonth()];

      return `${month} ${numberDate}, ${year}`;
};

function showTemp(response) {
  let dayElement = document.querySelector("#day");
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currenttemp");
  let locationElement = document.querySelector("#city");
  let iconElement = document.querySelector("#current-weather-icon");
 
  fahrenheitTemperature = response.data.main.temp;
 
  temperatureElement.innerHTML = `${temperature}`;
  locationElement.innerHTML = response.data.name;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let now = new Date();
  dayElement.innerHTML = formatDay(now);
  dateElement.innerHTML = formatDate(now);
  timeElement.innerHTML = formatHours(now);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2 day-card">
              <ul class="text-center">
                <li class="day">
                 ${formatHours(forecast.dt * 1000)}
                </li>
                <li>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png"
                  />
                  </i>
                </li>
                <li >
                  <span class="highs">
                  ${Math.round(forecast.main.temp_max)}°
                  </span>|
                  <span class="lows">
                  ${Math.round(forecast.main.temp_min)}°
                  </span>
                </li>
              </ul>
            </div>
    `;
  }
  console.log(response.data)
}

function search(city) {
let apiKey = "8fb476c298015405b2d8169c9a04e3da";
let units = "imperial";
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(`${apiUrl}`).then(showTemp);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecast);
}
      
function handleSubmit(event) {
   event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
      
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currenttemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8fb476c298015405b2d8169c9a04e3da";
  let units = "imperial";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

      function getCurrentlocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currenttemp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentLocation = document.querySelector("#locbutton");
currentLocation.addEventListener("click", getCurrentlocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#currenttemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Hollister");