document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temprature = document.getElementById("temprature");
    const description = document.getElementById("description");
    const errorMsg = document.getElementById("error-message");

    //API KEY
    const API_KEY = "e9319a43e6e2bfafb2facadf5868729f";

    getWeatherBtn.addEventListener('click', async () => { //making this function async because the response made while fetching the data is never as servers are too far so it needs some time to grab the response and `async function` can handel this easily.
        const city = cityInput.value.trim();
        if(!city) return;

        //It may throw an error.
        //Servers/Databases is always in another continent.

        try {
            const weatherData = await fetchData(city)
            displayData(weatherData);
        } catch (error) {
            showError()
        }

    })

    async function fetchData(city) {
        //gets the data.
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        //Fetch request for data to be fetched from API.
        const response = await fetch(url);
        console.log(typeof response)
        console.log("RESPONSE", response)

        //From above code we fetched the response from API but it's not redirected to browser so to make it visible we have to do this:-
        if(!response.ok){
            throw new error("City not found!!!!")
        }
        //If our  code is not throwing any error so we must get the response and convert it into json object to display it.
        const data = await response.json()
        return data;
    }

    function displayData(weatherData) {
        //display the data.
        console.log(weatherData)
        const {name, main, weather} = weatherData;
        cityName.textContent = name;

        //We have used the `hidden` class in our HTML to toggle the response for our city name so we have to unlock it (make it  show).
        weatherInfo.classList.remove('hidden');
        errorMsg.classList.add('hidden')
        temprature.textContent = `Temperature : ${main.temp}`
        description.textContent = `Weather : ${weather[0].description}`
    }

    function showError() {
        //displays the error.

        //When the correct data is displayed the error is hidden and when error occours the error gets showed.
        weatherInfo.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
})