const apiKey = "KNYHD2SRQ3N6VTUYZ8A9JSZFT"; // Replace with your Visual Crossing API key

function getWeather() {
  const location = document.getElementById("locationInput").value;
  fetchWeatherData(location);
}

function fetchWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(data) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  const current = data.currentConditions;

  let html = `
    <h2>${data.resolvedAddress}</h2>
    <p><strong>Temperature:</strong> ${current.temp}°C</p>
    <p><strong>Wind Speed:</strong> ${current.windspeed} km/h</p>
    <p><strong>Conditions:</strong> ${current.conditions} ${getWeatherEmoji(current.conditions)}</p>
    <p><strong>Rain Probability:</strong> ${current.precipprob || 0}%</p>
    <h3>Next 24 Hours</h3>
  `;

  for (let i = 0; i < 24; i++) {
    const hour = data.days[0].hours[i];
    html += `
      <div>
        <p><strong>${hour.datetime}</strong> - ${hour.temp}°C, ${hour.conditions} ${getWeatherEmoji(hour.conditions)}</p>
      </div>
    `;
  }

  weatherDisplay.innerHTML = html;
}

function getWeatherEmoji(condition) {
  if (condition.toLowerCase().includes("sunny")) {
    return "☀️";
  } else if (condition.toLowerCase().includes("cloudy")) {
    return "☁️";
  } else if (condition.toLowerCase().includes("rain")) {
    return "🌧️";
  } else if (condition.toLowerCase().includes("snow")) {
    return "❄️";
  } else {
    return ""; // No emoji if no matching condition
  }
}

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const location = `${lat},${lon}`;
      fetchWeatherData(location);
    },
    (error) => {
      alert("Unable to get location.");
      console.error(error);
    }
  );
}
