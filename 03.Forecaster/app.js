function attachEvents() {
	const baseUrl = "http://localhost:3030/jsonstore/forecaster";
	const submitBtn = document.getElementById("submit");
	const locationInput = document.getElementById("location");
	const forecastDiv = document.getElementById("forecast");
	const currentDiv = document.getElementById("current");
	const upcomingDiv = document.getElementById("upcoming");

submitBtn.addEventListener("click", async () => {
  const locationName = locationInput.value;
  
  try {
    const response = await fetch(`${baseUrl}/locations`);
    const data = await response.json();

    const location = data.find(l => l.name.toLowerCase() === locationName.toLowerCase());

    if (!location) {
      throw new Error("Location not found!");
    }

    const todayResponse = await fetch(`${baseUrl}/today/${location.code}`);
    const upcomingResponse = await fetch(`${baseUrl}/upcoming/${location.code}`);
    
    const todayData = await todayResponse.json();
    const upcomingData = await upcomingResponse.json();

    currentDiv.innerHTML = `
      <div class="label">${todayData.name}</div>
      <div class="forecasts">
        <span class="condition symbol">${getWeatherSymbol(
          todayData.forecast.condition
        )}</span>
        <span class="condition">
          <span class="forecast-data">${todayData.forecast.low}&deg;/${
            todayData.forecast.high
          }&deg;</span>
          <span class="forecast-data">${todayData.forecast.condition}</span>
        </span>
      </div>
    `;

    upcomingDiv.innerHTML = `
      <div class="label">${upcomingData.name}</div>
      ${upcomingData.forecast
        .map(
          f => `
          <div class="forecasts upcoming">
            <span class="condition symbol">${getWeatherSymbol(f.condition)}</span>
            <span class="condition">
              <span class="forecast-data">${f.low}&deg;/${f.high}&deg;</span>
              <span class="forecast-data">${f.condition}</span>
            </span>
          </div>
        `
        )
        .join("")}
    `;

    forecastDiv.style.display = "block";
  } catch (err) {
    console.error(err);
    currentDiv.innerHTML = '<div class="label">Error</div>';
    upcomingDiv.innerHTML = '<div class="label">Error</div>';
    forecastDiv.style.display = "block";
		}
	})


function getWeatherSymbol(condition) {
	switch (condition) {
	  case "Sunny":
		return "&#x2600;"; // ☀
	  case "Partly sunny":
		return "&#x26C5;"; // ⛅
	  case "Overcast":
		return "&#x2601;"; // ☁
	  case "Rain":
		return "&#x2614;"; // ☂
	  default:
		return condition;
	}
  }
}
  
  attachEvents();