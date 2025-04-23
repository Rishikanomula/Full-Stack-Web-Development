const apiKey = 'df3c1f0ca3daa1e72feee07dae9c78b1';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');


searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim(); 
    if (city) {
        getWeather(city); 
    } else {
        alert('Please enter a city name.'); 
    }
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    console.log('API URL:', apiUrl); 

    fetch(apiUrl)
        // .then(response => response.json())
        // .then(data => {
        //     document.getElementById("loadingMessage").style.display = "none";
        //     displayWeather(data);
        // })
        // .catch(error => {
        //     document.getElementById("loadingMessage").style.display = "none"; 
        //     alert('Error: ' + error.message);
        // });

        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'City not found.');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); 
            displayWeather(data); 
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error: ' + error.message); 
        });
}

function changeBackground(weatherCondition) {
    const body=document.body;
    const backgrounds={
        Clear: "linear-gradient(120deg, #fddb92, #d1f8fa)",
        Clouds: "linear-gradient(120deg, #8c92ac, #d1f8fa)",
        Rain: "linear-gradient(120deg, #636e72, #74b9ff)",
        Snow: "linear-gradient(120deg,rgb(239, 235, 235),rgb(197, 232, 233))",
        Thunderstorm: "linear-gradient(120deg, #2c3e50, #4ca1af)",
        Default: "linear-gradient(120deg, #d1f8fa, #34a0ff)"
    };
    body.style.background=backgrounds[weatherCondition] || backgrounds["Default"]
}

function displayWeather(data) {
    if (!data.weather || data.weather.length === 0) {
        console.error('Weather data is missing:', data);
        alert('Weather data not found for this location.');
        return;
    }

    // Extract relevant data from the API response
    const cityName = data.name;
    const temperature = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
    const weatherDescription = data.weather[0].description;
    const feelsLike = (data.main.feels_like - 273.15).toFixed(2); 
    const weatherCondition = data.weather[0].main;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const sunriseTime=new Date(data.sys.sunrise*1000).toLocaleTimeString();
    const sunsetTime=new Date(data.sys.sunset*1000).toLocaleTimeString();

    // Update the DOM with the fetched data
    cityNameElement.textContent = cityName;
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    descriptionElement.textContent = `Condition: ${weatherCondition}`;
    descriptionElement.textContent = `Description: ${weatherDescription}`;
    // descriptionElement.textContent = `Humidity: ${humidity}%`;
    // descriptionElement.textContent = `Wind Speed: ${windSpeed} m/s`;
    // descriptionElement.textContent = `Pressure: ${pressure} hPa`;
    // descriptionElement.textContent = `Sunrise: ${sunriseTime}`;
    // descriptionElement.textContent = `Sunset: ${sunsetTime}`;
    // descriptionElement.textContent = `Feels Like: ${feelsLike}°C`;
    document.getElementById("feelsLike").textContent = `Feels Like: ${feelsLike}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${windSpeed} m/s`;
    document.getElementById("pressure").textContent = `Pressure: ${pressure} hPa`;
    document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime}`;
    document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;

    const images = {
        Clear: "images/clear.svg",
        Clouds: "images/cloudy.svg",
        Rain: "images/rainy.svg",
        Snow: "images/snow.svg",
        Thunderstorm: "images/thunderstorm.svg",
        Drizzle: "images/drizzle.svg",
        Mist: "images/mist.svg",
        Fog: "images/fog.svg",
        Haze: "images/haze.svg",
        Dust: "images/dust.svg",
        Wind: "images/wind.svg",
        Tornado: "images/tornado.svg",
        Smoke:"images/smoke.png"
    };

    const weatherImage = document.getElementById("weatherImage"); // Ensure it's defined
    if (weatherImage) {
        weatherImage.src = images[weatherCondition] || "images/default.gif";
        weatherImage.alt = weatherCondition;
    } else {
        console.error("weatherImage element not found.");
    }
    changeBackground(weatherCondition);
}

function displayError(message){
    cityNameElement.textContent=message;
    temperatureElement.textContent = "";
    descriptionElement.textContent = "";
    document.getElementById("feelsLike").textContent = "No data available";
    document.getElementById("humidity").textContent = "No data available";
    document.getElementById("windSpeed").textContent = "No data available";
    document.getElementById("pressure").textContent = "No data available";
    document.getElementById("sunrise").textContent = "No data available";
    document.getElementById("sunset").textContent = "No data available";
    document.getElementById("weatherImage").src = "images/default.gif";
}