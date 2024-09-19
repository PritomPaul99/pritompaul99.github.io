let searchinput = document.querySelector(`.searchinput`);

const search = async (city) => {
  console.log(city);

  let url = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=5863cb59bb064eca989192814241809&q=${city}&aqi=yes`
  );

  if (url.ok) {
    let data = await url.json();
    console.log("Weather Data: ", data);

    let today = new Date();
    let todayDate = today.toISOString().split("T")[0];
    console.log("Today's Date: ", todayDate);

    let astro = await fetch(
      `http://api.weatherapi.com/v1/astronomy.json?key=5863cb59bb064eca989192814241809&q=${city}&dt=${todayDate}`
    );
    let astroData = await astro.json();
    console.log("Astro Data: ", astroData);

    let box = document.querySelector(".return");
    box.style.display = "block";

    let message = document.querySelector(".message");
    message.style.display = "none";

    let errormessage = document.querySelector(".error-message");
    errormessage.style.display = "none";

    let weatherImg = document.querySelector(".weather-img");
    document.querySelector(".city-name").innerHTML = data.location.name;
    document.querySelector(".weather-temp").innerHTML =
      Math.round(data.current.temp_c) + "° C";
    document.querySelector(".wind").innerHTML =
      Math.round(data.current.wind_kph) + " km/h";
    document.querySelector(".pressure").innerHTML =
      Math.round(data.current.pressure_mb) + " hPa";
    document.querySelector(".humidity").innerHTML =
      Math.round(data.current.humidity) + "%";

    document.querySelector(".sunrise").innerHTML =
      astroData.astronomy.astro.sunrise;
    document.querySelector(".sunset").innerHTML =
      astroData.astronomy.astro.sunset;

    const setWeatherIcons = (isDay, weatherMessage) => {
      if (isDay == 1) {
        if (weatherMessage === "Sunny") {
          weatherImg.src = "assects/icons/day/sunny.png";
        } else if (weatherMessage === "Partly Cloudy") {
          weatherImg.src = "assects/icons/day/partly-cloudy-day.png";
        } else if (weatherMessage === "Cloudy") {
          weatherImg.src = "assects/icons/day/cloudy-day.png";
        } else if (weatherMessage === "Light rain") {
          weatherImg.src = "assects/icons/day/light-rain-day.png";
        } else if (weatherMessage.includes("rain")) {
          weatherImg.src = "assects/icons/day/day-thunder.png";
        } else {
          weatherImg.src = "assects/icons/day/weather.png";
        }
      } else {
        if (weatherMessage === "Clear") {
          weatherImg.src = "assects/icons/night/clear_night.png";
        } else if (weatherMessage === "Partly Cloudy") {
          weatherImg.src = "assects/icons/night/partly-cloudy-night.png";
        } else if (weatherMessage === "Cloudy") {
          weatherImg.src = "assects/icons/night/cloudy-night.png";
        } else if (weatherMessage.includes("rain")) {
          weatherImg.src = "assects/icons/night/night-thunder.png";
        } else {
          weatherImg.src = "assects/icons/night/starry-night.png";
        }
      }
    };
    let isDay = data.current.is_day;
    setWeatherIcons(isDay, data.current.condition.text);
  } else {
    let box = document.querySelector(".return");
    box.style.display = "none";

    let message = document.querySelector(".message");
    message.style.display = "none";

    let errormessage = document.querySelector(".error-message");
    errormessage.style.display = "block";
  }
};

searchinput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    search(searchinput.value);
    console.log("worked");
  }
});
