document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input")
    const cityButton = document.getElementById("search-button")
    const weatheInfo = document.getElementById("weathe-info")
    const cityNameDispaly = document.getElementById("city-name")
    const temparectureDisplay = document.getElementById("weather-data")
    const discriptionDisplay = document.getElementById("discription")
    const errorMessege = document.getElementById("error-messege")
    const load=document.getElementById("loader")
    const API_KEY = "7355047791d3b82d064f10b72b92a673";

    cityButton.addEventListener("click", async () => {
        let city = cityInput.value.trim()
        if (city == "") return
        console.log(city);
         
         weatheInfo.classList.add("hidden");
        errorMessege.classList.add("hidden");
        load.classList.remove("hidden");

        try {
            const weatherData = await fetchWetherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }finally{
            load.classList.add("hidden")
        }
})

    async function fetchWetherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        const response=await fetch(url)
        console.log(response);
        
    if(!response.ok){
        throw new Error("City not found")
    }
    const data=await response.json()
    return data
    }

    function displayWeatherData(data) {
        console.log(data);
        const {name,main,weather} = data
        cityNameDispaly.textContent=name
        temparectureDisplay.textContent=`Temparature :${main.temp}`
        discriptionDisplay.textContent=`Weather :${weather[0].description}`

        weatheInfo.classList.remove("hidden")
        errorMessege.classList.add("hidden");
    }

    function showError() {
        weatheInfo.classList.add("hidden");
        errorMessege.classList.remove("hidden");
    }
})


// ///////////////////////////////////////////////////////
