//js for fetch weather api
const cityWeather= document.querySelector("#weather");

const getWeather = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`) //fetch API
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");

        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        let celsius = document.createElement("div"); 
        //convert temp to Celsius
        let celsiusNode = document.createTextNode("\t Temperature:" + ((data.main.temp)-273.15).toFixed(2) + " °C "); 
        celsius.appendChild(celsiusNode);

        

        let desc = document.createElement("div");
        let descNode = document.createTextNode("| " + data.weather[0].description);
        desc.appendChild(descNode);
        desc.style.display = "inline-block";
        

        //fetch weather icon from API
        let icon = document.createElement("img");
        icon.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`); 
        icon.setAttribute("alt", data.weather[0].description);
        icon.style.display = "inline-block"; 
        icon.style.verticalAlign = "middle";
        icon.style.marginRight = "10px";

        let time = document.createElement("div");
        const date = new Date();
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();

        //convert timezone to AM PM 12 hours format 
        const timezoneOffset = 3600; // in seconds
        const Hours = (utcHours + (timezoneOffset / 3600)) % 24;
        const Minutes = utcMinutes;
        const Time = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Bangkok'});
        let timeNode = document.createTextNode(`Now it is  ${Time} in  ${data.name}.`);
        time.appendChild(timeNode);
        
        //br
        const br = document.createElement("br");
        const br2 = document.createElement("br");

        let sunset = document.createElement("div");

        //convert sunset to AM PM 12 hours format 
        const sunsetTime = new Date(data.sys.sunset * 1000);
        const sunsetTimeLocal = sunsetTime.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Bangkok'});

        //TEXT
        let sun = document.createElement("div");
        let sunNode = document.createTextNode(` Never miss this golden time:`);
        sun.appendChild(sunNode);

        //display sunset
        let sunsetNode = document.createTextNode(`Sunset 🌄: ${sunsetTimeLocal}`);
        sunset.appendChild(sunsetNode);

         //convert sunrise to AM PM 12 hours format 
        let sunrise = document.createElement("div");
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunriseTimeLocal = sunriseTime.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Bangkok'});
        //display sunrise
        let sunriseNode = document.createTextNode(`Sunrise 🌅: ${sunriseTimeLocal}`);
        sunrise.appendChild(sunriseNode);

        //append all data to div
        div.appendChild(br2);
        div.appendChild(city);
        div.appendChild(celsius);
        div.appendChild(icon);
        div.appendChild(desc);
        div.appendChild(time);
        div.appendChild(br);
        div.appendChild(sun);
        div.appendChild(sunset);
        div.appendChild(sunrise);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}

//remove when search new
document.addEventListener("DOMContentLoaded", (e) => {
    cityWeather.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeather(document.getElementById("city").value); 
        }
        else{
            console.log("You must provide a city");
        }
    })
})
//end of fetch api