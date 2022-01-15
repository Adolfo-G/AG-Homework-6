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
var forecastContainerEl=document.querySelector(".five-day-forecast")
var historyEl=document.querySelector("#history")
var cityData=[]

searchEl.addEventListener("click",main)

history()

function main(){
    city=inputEl.value
    if(city!==""){cityData.push(city)}
    inputEl.value=""
    localStorage.setItem("city",JSON.stringify(cityData))
    if(city!==""){history()}
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
                
                uvEl.classList.remove("favorable","moderate","severe")
                if(data.current.uvi<=2){
                    uvEl.classList.add("favorable")
                }else if(2<data.current.uvi && data.current.uvi<=5){
                    uvEl.classList.add("moderate")
                }else{
                    uvEl.classList.add("severe")
                }

                if(forecastContainerEl.hasChildNodes()){
                    while (forecastContainerEl.firstChild) {
                        forecastContainerEl.removeChild(forecastContainerEl.lastChild)
                    }
                }
                for(var i=1;i<6;i++){
                    now=moment().add(i, 'days').format("MM/DD/YYYY")
                    var containerEl=document.createElement("div")
                    containerEl.classList.add("five-day-cards")
                    forecastContainerEl.appendChild(containerEl)
                    //date
                    var date5DayEl=document.createElement("p")
                    date5DayEl.classList.add("main-margin")
                    var span1El=document.createElement("span")
                    span1El.setAttribute("id",`condition-${i}`)
                    date5DayEl.appendChild(span1El)
                    date5DayEl.textContent=now
                    date5DayEl.setAttribute("style","font-weight:bold")
                    containerEl.appendChild(date5DayEl)
                    //condition
                    var span5El=document.createElement("div")
                    span5El.setAttribute("id",`temp-${i}`)
                    span5El.classList.add("main-margin")
                    var condition5DayEl=document.createElement("img")
                    condition5DayEl.setAttribute("src",`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`)
                    span5El.appendChild(condition5DayEl)
                    containerEl.appendChild(span5El)
                    //temp
                    var temp5DayEl=document.createElement("p")
                    temp5DayEl.textContent="Temp: "
                    temp5DayEl.classList.add("main-margin")
                    var span2El=document.createElement("span")
                    span2El.setAttribute("id",`temp-${i}`)
                    span2El.textContent=data.daily[i].temp.day+" °F"
                    temp5DayEl.appendChild(span2El)
                    containerEl.appendChild(temp5DayEl)
                    //wind
                    var wind5DayEl=document.createElement("p")
                    wind5DayEl.classList.add("main-margin")
                    wind5DayEl.textContent="Wind: "
                    var span3El=document.createElement("span")
                    span3El.setAttribute("id",`temp-${i}`)
                    span3El.textContent=data.daily[i].wind_speed+" mph"
                    wind5DayEl.appendChild(span3El)
                    containerEl.appendChild(wind5DayEl)
                    //humidity
                    var humidity5DayEl=document.createElement("p")
                    humidity5DayEl.textContent="Humidity: "
                    humidity5DayEl.classList.add("main-margin")
                    var span4El=document.createElement("span")
                    span4El.textContent=data.daily[i].humidity+" %"
                    span4El.setAttribute("id",`temp-${i}`)
                    humidity5DayEl.appendChild(span4El)
                    containerEl.appendChild(humidity5DayEl)
                }
            })
    })

}

function history(){
    if(historyEl.hasChildNodes()){
        while (historyEl.firstChild) {
            historyEl.removeChild(historyEl.lastChild)
        }
    }
    var retrievedData= JSON.parse(localStorage.getItem("city"));
    if(retrievedData!=null){
        cityData=retrievedData
        for(var i=0;i<retrievedData.length;i++){
            var historyBtnEl=document.createElement("button")
            historyBtnEl.textContent=retrievedData[i]
            historyBtnEl.classList.add("history-Btn")
            
            historyBtnEl.addEventListener("click",function(){
                inputEl.value=this.textContent
                main()
            })
            historyEl.appendChild(historyBtnEl)
        }
    }
}

clearEl.addEventListener("click",function(){
    cityData=[]
    localStorage.clear()
    if(historyEl.hasChildNodes()){
        while (historyEl.firstChild) {
            historyEl.removeChild(historyEl.lastChild)
        }
    }
})
