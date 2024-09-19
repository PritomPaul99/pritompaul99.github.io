navigator.geolocation.getCurrentPosition(
  async (position) => {
    try {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      console.log(latitude, longitude);

      var map = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=5863cb59bb064eca989192814241809&q=${latitude},${longitude}&aqi=yes`
      );

      var userdata = await map.json();
      console.log(userdata);

      let isCelsius = true;

      let cityName = document.getElementById("city-name");
      let weatherStat = document.getElementById("weather-main");
      let currentTemp = document.getElementById("temp");
      let humidity = document.getElementById("humidity");
      let feelsLike = document.getElementById("feels-like");
      let wind_speed = document.getElementById("wind-speed");
      let wind_gust = document.getElementById("wind-gust");
      let air_quality = document.getElementById("air-quality");
      let pressure = document.getElementById("pressure");
      let visibility = document.getElementById("visibility");
      let uv_index = document.getElementById("uv-index");
      let temp_today = document.getElementById("temp-today1");
      let weather_main_today = document.getElementById("weather-main-today");
      let isDay = userdata.current.is_day;
      let weatherImg = document.querySelector(".weather-icon");
      let weatherImgs = document.querySelector(".weather-icons");

      cityName.innerHTML = userdata.location.name;
      weatherStat.innerHTML = userdata.current.condition.text;
      currentTemp.innerHTML = Math.round(userdata.current.temp_c) + "° C";
      humidity.innerHTML = userdata.current.humidity;
      feelsLike.innerHTML = userdata.current.feelslike_c + "° C";
      wind_speed.innerHTML = userdata.current.wind_kph;
      wind_gust.innerHTML = userdata.current.gust_kph;
      //   air_quality.innerHTML = userdata.current.air_quality["us-epa-index"];
      let air_quality_index = userdata.current.air_quality["us-epa-index"];
      if (air_quality_index == 1) {
        air_quality.innerHTML = "Good";
      } else if (air_quality_index == 2) {
        air_quality.innerHTML = "Moderate";
      } else if (air_quality_index == 3) {
        air_quality.innerHTML = "Unhealthy for sensitive group";
      } else if (air_quality_index == 4) {
        air_quality.innerHTML = "Unhealthy";
      } else if (air_quality_index == 5) {
        air_quality.innerHTML = "very Unhealthy";
      } else {
        air_quality.innerHTML = "Hazardous";
      }
      pressure.innerHTML = userdata.current.pressure_mb;
      visibility.innerHTML = userdata.current.vis_km;
      uv_index.innerHTML = userdata.current.uv;
      temp_today.innerHTML = Math.round(userdata.current.temp_c) + "° C";
      weather_main_today.innerHTML = userdata.current.condition.text;

      currentTemp.addEventListener("click", () => {
        if (isCelsius) {
          currentTemp.innerHTML = Math.round(userdata.current.temp_f) + "° F";
          feelsLike.innerHTML = userdata.current.feelslike_f + "° F";

          isCelsius = false;
        } else {
          currentTemp.innerHTML = Math.round(userdata.current.temp_c) + "° C";
          feelsLike.innerHTML = userdata.current.feelslike_c + "° C";

          isCelsius = true;
        }
      });

      //   Icon setting
      // Function to set the weather icons
      function setWeatherIcons(isDay, weatherMessage) {
        if (isDay == 1) {
          if (weatherMessage === "Sunny") {
            weatherImg.src = "assects/icons/day/sunny.png";
            weatherImgs.src = "assects/icons/day/sunny.png";
          } else if (weatherMessage === "Partly Cloudy") {
            weatherImg.src = "assects/icons/day/partly-cloudy-day.png";
            weatherImgs.src = "assects/icons/day/partly-cloudy-day.png";
          } else if (weatherMessage === "Cloudy") {
            weatherImg.src = "assects/icons/day/cloudy-day.png";
            weatherImgs.src = "assects/icons/day/cloudy-day.png";
          } else if (weatherMessage === "Light rain") {
            weatherImg.src = "assects/icons/day/light-rain-day.png";
            weatherImgs.src = "assects/icons/day/light-rain-day.png";
          } else if (weatherMessage.includes("rain")) {
            weatherImg.src = "assects/icons/day/day-thunder.png";
            weatherImgs.src = "assects/icons/day/day-thunder.png";
          } else {
            weatherImg.src = "assects/icons/day/weather.png";
            weatherImgs.src = "assects/icons/day/weather.png";
          }
        } else {
          if (weatherMessage === "Clear") {
            weatherImg.src = "assects/icons/night/clear_night.png";
            weatherImgs.src = "assects/icons/night/clear_night.png";
          } else if (weatherMessage === "Partly Cloudy") {
            weatherImg.src = "assects/icons/night/partly-cloudy-night.png";
            weatherImgs.src = "assects/icons/night/partly-cloudy-night.png";
          } else if (weatherMessage === "Cloudy") {
            weatherImg.src = "assects/icons/night/cloudy-night.png";
            weatherImgs.src = "assects/icons/night/cloudy-night.png";
          } else if (weatherMessage.includes("rain")) {
            weatherImg.src = "assects/icons/night/night-thunder.png";
            weatherImgs.src = "assects/icons/night/night-thunder.png";
          } else {
            weatherImg.src = "assects/icons/night/starry-night.png";
            weatherImgs.src = "assects/icons/night/starry-night.png";
          }
        }
      }
      setWeatherIcons(isDay, userdata.current.condition.text);

      var forecast_map = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=5863cb59bb064eca989192814241809&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`
      );
      var Fdata = await forecast_map.json();

      function addForecastItem(day, isDay, weatherMessage, tempMin, tempMax) {
        // Use the correct class name to target the container
        const forecastBox = document.querySelector(".forecast-box-inside");

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        const dayName = document.createElement("div");
        dayName.classList.add("day-name");
        dayName.textContent = day;

        const weatherIcon = document.createElement("div");
        weatherIcon.classList.add("weather-icon-forecast");

        const img = document.createElement("img");
        img.classList.add("weather-icons");

        // Set the weather icon dynamically
        setWeatherIcons(isDay, weatherMessage);
        img.src = weatherImg.src; // Get the current weather image source
        img.alt = weatherMessage;
        weatherIcon.appendChild(img);

        const tempForecast = document.createElement("div");
        tempForecast.classList.add("temp-forecast");
        tempForecast.innerHTML = `<span class="temp-min">${tempMin}°</span> / <span class="temp-max">${tempMax}°</span>`;

        const weatherMainDiv = document.createElement("div");
        weatherMainDiv.classList.add("weather-main-forecast");
        weatherMainDiv.textContent = weatherMessage;

        forecastItem.appendChild(dayName);
        forecastItem.appendChild(weatherIcon);
        forecastItem.appendChild(tempForecast);
        forecastItem.appendChild(weatherMainDiv);

        forecastBox.appendChild(forecastItem);
      }

      let forecastDays = Fdata.forecast.forecastday.slice(1, 4);
      forecastDays.forEach((forecastDay) => {
        let day = forecastDay.date.slice(5);
        let weatherMessage = forecastDay.day.condition.text;
        let tempMin = Math.round(forecastDay.day.mintemp_c);
        let tempMax = Math.round(forecastDay.day.maxtemp_c);
        let isDay = forecastDay.is_day; // Use this to determine day or night icons

        addForecastItem(day, isDay, weatherMessage, tempMin, tempMax);
      });
    } catch (err) {
      console.error("An error occurred:", err);
    }
  },
  () => {
    alert("Please turn on your location and refresh the page");
  }
);
