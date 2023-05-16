"use strict";

const apiKey = "6ce3dce10eea9d7c4c631025f002664d";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchElement = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    document.querySelector(".error").style.display = "none";
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + `°C`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
    }

    document.querySelector(".weather").style.display = "block";
  }
}

searchButton.addEventListener("click", function () {
  checkWeather(searchElement.value);
});

searchElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchElement.value);
  }
});
