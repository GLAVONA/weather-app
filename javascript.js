const apiKey = "679d01483acabe855aa5a4dc5256fc4e";
let city = "";
let apiURL = "";
let currentTemp = 0;
let description = "";
const container = document.querySelector(".container");

async function getWeatherData() {
  try {
    let response = await fetch(apiURL);
    let weather = await response.json();
    currentTemp = weather.main.temp;
    description = weather.weather[0].description;
    return weather;
  } catch (error) {
    throw new Error(error);
  }
}

async function printMe() {
  try {
    let weather = await getWeatherData();
    const gifData = await getGif();
    if(weather){
        gifDiv.src = gifData.data.images.original.url;
        cityDiv.textContent = `City: ${city}`
        tempDiv.textContent = `Temp: ${currentTemp} °C`;
        descriptionDiv.textContent = `Weather: ${description}`
        console.log(currentTemp);
        console.log(description);
    }
  } catch (error) {
    throw new Error(error);
  }
}

const input = document.createElement("input");
container.appendChild(input);

const searchButton = document.createElement("button");
searchButton.textContent = "Search";
container.appendChild(searchButton);

input.addEventListener("input", () => {
  city = input.value;
  apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
});

searchButton.addEventListener("click", () => {
  printMe();
});

const cityDiv = document.createElement("div");
cityDiv.className = "city";
cityDiv.textContent = "City: ";
container.appendChild(cityDiv);

const tempDiv = document.createElement("div");
tempDiv.className = "temp";
tempDiv.textContent = "Temp: ";
container.appendChild(tempDiv);

const descriptionDiv = document.createElement("div");
descriptionDiv.className = "description";
descriptionDiv.textContent = "Weather: ";
container.appendChild(descriptionDiv);

const gifDiv = document.createElement("img");
gifDiv.className = "gif";
container.appendChild(gifDiv);

async function getGif() {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=9X9Bspt1MPiZ2ncqBHUSnFbx7ERanU0i&s=${
        description + " weather"
      }`,
      { mode: "cors" }
    );
    const gifData = await response.json();
    return gifData;
  } catch (error) {
    throw new Error(error);
  }
}
