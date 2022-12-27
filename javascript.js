const apiKey = "679d01483acabe855aa5a4dc5256fc4e";
let city = "Sofia";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

let currentTemp = 0;
let description = "";

async function getWeatherData(){
    try {
        let response = await fetch(apiURL);
        let weather = await response.json();
        currentTemp = weather.main.temp;
        description = weather.weather[0].description;
        console.log(weather);
        return weather;
    } catch (error) {
        console.log(error)
    }
}

async function printMe(){
    await getWeatherData();
    console.log(currentTemp);
    console.log(description);
}

printMe();

const input = document.createElement("input");
document.body.appendChild(input);