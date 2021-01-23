function formatDate(date) {
    let numberDate = now.getDate();
      let hours = now.getHours();
      if (hours < 10){
          hours = `0${hours}`
      }
      let minutes = now.getMinutes();
      if (minutes < 10) {
          minutes = `0${minutes}`
      }
      let year = now.getFullYear();

      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let day = days[now.getDay()];

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

      return `${day} ${month} ${numberDate}, ${year}, ${hours}:${minutes}`;
};

let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = formatDate(now);


let cityName = "Hollister";
let apiKey = "8fb476c298015405b2d8169c9a04e3da";
let units = "imperial";
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl = `${apiEndPoint}?q=${cityName}&appid=${apiKey}&units=${units}`;

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currenttemp");
  let locationElement = document.querySelector("#city");
  temperatureElement.innerHTML = `${temperature}`;
  locationElement.innerHTML = `${cityName}`;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

axios.get(`${apiUrl}`).then(showTemp);

function displayTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currenttemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}
      
function getCity(event) {
   event.preventDefault();
          let location = document.querySelector("#location");
          let city = document.querySelector("#city");
          city.innerHTML = `${location}`;
          let apiKey = "8fb476c298015405b2d8169c9a04e3da";
          let units = "imperial";
          let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
          let apiUrl = `${apiEndPoint}?q=${location.value}&appid=${apiKey}&units=${units}`;
          axios.get(apiUrl).then(displayTemp);
}
      
      let enterLocation = document.querySelector("#change-location");
      enterLocation.addEventListener("submit", getCity);

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

let currentLocation = document.querySelector("#locbutton");
currentLocation.addEventListener("click", getCurrentlocation);

