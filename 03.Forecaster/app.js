function attachEvents() {

	const url = "http://localhost:3030/jsonstore/forecaster";
	const submit = document.getElementById("submit");

	const loc = document.getElementById("location");

	const forecastDiv = document.getElementById("forecast");
	const currentDiv = document.getElementById("current");
	const upcomingDiv = document.getElementById("upcoming");

submit.addEventListener('click', doTheMagic);

async function doTheMagic(ev){

  ev.preventDefault();
  const locname = loc.value;
  
  try {
    const response = await fetch(`${url}/locations`);
    const data = await response.json();

    const location = data.find(a => a.name.toLowerCase() === locname.toLowerCase());

    if (!location) {
      throw new Error("Location not found!");
    }

    const todayResponse = await fetch(`${url}/today/${location.code}`);
    const upcomingResponse = await fetch(`${url}/upcoming/${location.code}`);
    
    const todayData = await todayResponse.json();
    const upcomingData = await upcomingResponse.json();

    currentDiv.innerHTML = `
      <div class="label">${todayData.name}</div>
      <div class="forecasts">
        <span class="condition symbol">${symbol(
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
          a => `
          <div class="forecasts upcoming">
            <span class="condition symbol">${symbol(a.condition)}</span>
            <span class="condition">
              <span class="forecast-data">${a.low}&deg;/${a.high}&deg;</span>
              <span class="forecast-data">${a.condition}</span>
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
	}
}


function symbol(condition) {
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

  
  attachEvents();