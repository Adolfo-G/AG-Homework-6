const key="fac4d9ed9a4c7363e7d23a8570717739"
var inputEl=document.querySelector("#input")
var searchEl=document.querySelector("#search-btn")
var clearEl=document.querySelector("#clear")
var city;
var cityNameEl=document.querySelector("#city-name")
var dayEl=document.querySelector("#day")
var condition1El=document.querySelector("#condition-1")
var tempEl=document.querySelector("#temp")
var windEl=document.querySelector("#wind")
var humidityEl=document.querySelector("#humidity")
var uvEl=document.querySelector("#uv")


searchEl.addEventListener("click",main)


function main(){
    city=inputEl.value
    inputEl.value=""
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var lat=data.coord.lat
        var long=data.coord.lon
        var cityName=data.name
        console.log(data)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${key}`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){

                cityNameEl.textContent=cityName+" "
                var now= moment().format("(MM/DD/YYYY)")
                dayEl.textContent=now+" "
                condition1El.setAttribute("src",`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
                condition1El.setAttribute("style","display:inline")
                tempEl.textContent=data.current.temp +" °F"
                windEl.textContent=data.current.wind_speed+" mph"
                humidityEl.textContent=data.current.humidity+" %"
                uvEl.textContent=data.current.uvi
            })
    })

}



