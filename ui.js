class UI {
    // mostly used for define the html elements 
    constructor(){
        this.city = document.getElementById("main-header");
        this.currentDegree = document.getElementById("current-degree");
        this.currentText = document.getElementById("current-text");
        this.currentFeelslike = document.getElementById("current-feelslike");
        this.currentIcon = document.getElementById("current-icon");
        this.wind = document.getElementById("wind-info");
        this.humidity = document.getElementById("humidity-info");
        this.pressure = document.getElementById("pressure-info");
        this.uv = document.getElementById("uv-info");
        this.forecastList = document.getElementById("forecast-list");
        this.modal = document.getElementById("modal");
    }

    // displays the data of main card
    setCurrentValues(currentDataObject){
        this.city.textContent = currentDataObject.city;
        this.currentDegree.textContent = `${currentDataObject.currentDegree}°C`;
        this.currentText.textContent = currentDataObject.currentText;
        this.currentFeelslike.textContent = `Feels like ${currentDataObject.currentFeelslike}°C`;
        this.currentIcon.setAttribute("src", currentDataObject.currentIcon);
        this.currentIcon.setAttribute("alt", currentDataObject.currentText);
        this.wind.textContent = `${currentDataObject.windSpeed} km/h | ${currentDataObject.windDirection}`;
        this.humidity.textContent = `${currentDataObject.humidity}%`;
        this.pressure.textContent = `${currentDataObject.pressure} mb`;
        this.uv.textContent = currentDataObject.uv
    }

    // displays the data of forecast cards. dynamicly typed because of the array.
    setForecastValues(forecastObjectArr){
        for(let i = 0; i < forecastObjectArr.length; i++){
            this.forecastList.innerHTML += `
            <li>
                <div id="forecast-main">
                    <div>
                        <span>${forecastObjectArr[i].date}</span>
                        <span>${forecastObjectArr[i].text}</span>
                    </div>
                    <div>
                        <img src="${forecastObjectArr[i].icon}" alt="${forecastObjectArr[i].text}">
                    </div>
                    <div>
                        <span>${forecastObjectArr[i].maxTemp}°</span>
                        <span>${forecastObjectArr[i].minTemp}°</span>
                    </div>
                </div>
                <div id="forecast-side" class="dnone">
                    <ul>
                        <li>
                            <span>Average Temperature</span>
                            <span>${forecastObjectArr[i].averageTemp}°C</span>
                        </li>
                        <li>
                            <span>Average Humidity</span>
                            <span>${forecastObjectArr[i].humidity}%</span>
                        </li>
                        <li>
                            <span>Max Wind</span>
                            <span>${forecastObjectArr[i].wind} km/h</span>
                        </li>
                        <li>
                            <span>UV Index</span>
                            <span>${forecastObjectArr[i].uv}</span>
                        </li>
                        <li>
                            <span>Rain Chance</span>
                            <span>${forecastObjectArr[i].rainChance}%</span>
                        </li>
                        <li>
                            <span>Snow Chance</span>
                            <span>${forecastObjectArr[i].snowChance}%</span>
                        </li>
                        <li>
                            <span>Sunrise | Sunset</span>
                            <span>${forecastObjectArr[i].sunrise} | ${forecastObjectArr[i].sunset}</span>
                        </li>
                    </ul>
                </div>
            </li>
            `;
        }
    }

    // expands and collapse the forecast cards
    expand(){
        // get all forecast mains
        const forecastMains = document.querySelectorAll("#forecast-main");
        // loop through all the forecast mains
        forecastMains.forEach((forecastMain) => {
            // define forecast main's li
            const forecastMainParent = forecastMain.parentElement;
            // add event listener for toggle
            forecastMainParent.addEventListener("click", () => {
                forecastMain.nextElementSibling.classList.toggle("dnone");
            })
        })
    }
    // displays the modal 
    displayModal(){
        const ui = new UI;
        // set the display property to block
        modal.style.display = "block";
        // set focus on modal input
        document.getElementById("location-input").focus();
        // definition of close btn in the modal
        const closeBtn = document.getElementById("close-btn");
        // event listener for close button click
        closeBtn.addEventListener("click", ui.closeModal);
        // event listener for click outside the modal
        modal.addEventListener("click", ui.outsideClose);
    }

    // close the modal when close button clicked
    closeModal(){
        // set the display property to none
        modal.style.display = "none";
        // clear the modal form input value
        document.getElementById("location-input").value = "";
    }

    // closes the modal when clicked outside the modal
    outsideClose(e){
        if (e.target == modal) {
            // set the display property to none
            modal.style.display = "none";
            // clear the modal form input value
            document.getElementById("location-input").value = "";
        }
    }
}