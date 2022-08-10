// weather object. requires an api key to fetch data from url
class Weather {
    constructor(city){
        this.apiKey = "<YOUR_API KEY>";
        this.city = city;
    }

    // fetch data from url
    async getWeather(){
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.city}&days=7`);
        const weather = await response.json();
        return weather;
    }
    
    // set new location value
    changeLocation(city){
        this.city = city;
    }
}

