const apiKey = 'df3c1f0ca3daa1e72feee07dae9c78b1';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('descripition');


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
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'City not found. Please check the spelling.');
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

function displayWeather(data) {
    // Extract relevant data from the API response
    const cityName = data.name;
    const temperature = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
    const weatherDescription = data.weather[0].description; 
    const weatherCondition = data.weather[0].main;

    // Update the DOM with the fetched data
    cityNameElement.textContent = cityName;
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    descriptionElement.textContent = `Condition: ${weatherDescription}`;

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
}