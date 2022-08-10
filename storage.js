class Store {
    constructor(){
        this.city;
        this.defaultCity = "istanbul";
    }

    // get city value from local storage. if local storage is empty uses the default city from above
    getLocationData(){
        if(localStorage.getItem("city") === null){
            this.city = this.defaultCity;
        }else {
            this.city = localStorage.getItem("city");
        }
        return this.city;
    }

    // sets a new location to local storage
    setLocationData(city){
        localStorage.setItem("city", city);
    }
}