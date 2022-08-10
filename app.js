// Init Store
const store = new Store;
// Get Stored Location Data
const weatherLocation = store.getLocationData();
// Init weather
const weather = new Weather(weatherLocation);
// Init UI
const ui = new UI;
// Event listener for dom loaded
document.addEventListener("DOMContentLoaded", getWeather)

// event listener for change location button
const locationBtn = document.getElementById("location-btn");
locationBtn.addEventListener("click", ui.displayModal);

// event listener for modal form submit
const form = document.getElementById("location-form");
form.addEventListener("submit", (e) => {
    // get modal input value
    const inputValue = document.getElementById("location-input").value;
    // call for change location in weather.js
    weather.changeLocation(inputValue);
    // clear the previous location's forecast values
    ui.forecastList.innerHTML = "";
    // store the new location to local storage
    store.setLocationData(inputValue);
    // call the function to display new location data
    getWeather();
    // close the modal
    ui.closeModal();
    e.preventDefault();
})

function getWeather(){
    weather.getWeather().then(data => {
        // console.log(data);
    
        const currentDataObject = {
            // city from location
            city: data.location.name,
            // temp in celcius
            currentDegree: data.current.temp_c,
            // weather text
            currentText: data.current.condition.text,
            // feelslike in celcius
            currentFeelslike: data.current.feelslike_c,
            // weather icon
            currentIcon: data.current.condition.icon,
            // humidity
            humidity: data.current.humidity,
            // pressure in mb
            pressure: data.current.pressure_mb,
            // uv
            uv: data.current.uv,
            // wind direction
            windDirection: data.current.wind_dir,
            // wind kph
            windSpeed: data.current.wind_kph
        };
        // UI main card display function call
        ui.setCurrentValues(currentDataObject);
        // create an array to pass in a function. Array is gonna have objects inside
        const forecastObjectArr = [];
        // data.forecast.forecastday returns an array
        for(let i = 0; i < data.forecast.forecastday.length; i++){
            // create object to push in to the forecastObjectArr
            let forecastdayObj = {};
            // date
            forecastdayObj.date = data.forecast.forecastday[i].date;
            // sunrise
            forecastdayObj.sunrise = data.forecast.forecastday[i].astro.sunrise;
            // sunset
            forecastdayObj.sunset = data.forecast.forecastday[i].astro.sunset;
            // average temp in celcius
            forecastdayObj.averageTemp = data.forecast.forecastday[i].day.avgtemp_c;
            // max temp
            forecastdayObj.maxTemp = data.forecast.forecastday[i].day.maxtemp_c;
            // min temp
            forecastdayObj.minTemp = data.forecast.forecastday[i].day.mintemp_c;
            // weather text
            forecastdayObj.text = data.forecast.forecastday[i].day.condition.text;
            // weather icon
            forecastdayObj.icon = data.forecast.forecastday[i].day.condition.icon;
            // rain chance
            forecastdayObj.rainChance = data.forecast.forecastday[i].day.daily_chance_of_rain;
            // snow chance
            forecastdayObj.snowChance = data.forecast.forecastday[i].day.daily_chance_of_snow;
            // humidity
            forecastdayObj.humidity = data.forecast.forecastday[i].day.avghumidity;
            // max wind km/h
            forecastdayObj.wind = data.forecast.forecastday[i].day.maxwind_kph;
            // uv
            forecastdayObj.uv = data.forecast.forecastday[i].day.uv;
            // push the object to array
            forecastObjectArr.push(forecastdayObj);
        }
    
        // console.log(forecastObjectArr)
        // UI forecast card display function call
        ui.setForecastValues(forecastObjectArr);
        // collapseable function call. This does not work outside the promise
        ui.expand();
    }).catch(err => console.log(err)) // To catch the possible error.
}

