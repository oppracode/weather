"use strict";

const apiKey = "6ce3dce10eea9d7c4c631025f002664d";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const $searchElement = document.querySelector(".search input");
const $searchButton = document.querySelector(".search button");
const $weatherIcon = document.querySelector(".weather-icon");

const $humidityHeading = document.getElementById("humidity");
const $windHeading = document.getElementById("wind");

async function checkWeather(city) {
  try {
    if (city.length === 0) {
      throw new Error("Input doesn't have any text");
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").classList.remove("shown");
      console.log(response);
      throw new Error(`Request responsed with a 404 status`);
    }

    const data = await response.json();
    document.querySelector(".error").style.display = "none";
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + `°C`;
    document.querySelector(".city").innerText = data.name;
    $humidityHeading.innerText = data.main.humidity + "%";
    $windHeading.innerText = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clear":
        $weatherIcon.src = "images/clear.svg";
        break;
      case "Clouds":
        $weatherIcon.src = "images/clouds.svg";
        break;
      case "Rain":
        $weatherIcon.src = "images/rain.svg";
        break;
      case "Mist":
        $weatherIcon.src = "images/mist.svg";
        break;
      case "Snow":
        $weatherIcon.src = "images/snow.svg";
        break;
      case "Drizzle":
        $weatherIcon.src = "images/drizzle.svg";
        break;
    }

    document.querySelector(".weather").classList.add("shown");
  } catch (e) {
    console.error(e);
  }
}

$searchButton.addEventListener("click", () =>
  checkWeather($searchElement.value)
);

$searchElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather($searchElement.value);
  }
});
