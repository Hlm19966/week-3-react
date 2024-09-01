import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
 const[city, setCity] = useState("");
 const[loaded, setLoaeded] = useState(false);
 const[weather, setWeather] = useState({});


 function displayWeather(response) {
    setLoaeded(true);
    console.log(response.data);
    setWeather({
        temperature: Math.round(response.data.temperature.current),
        wind: Math.round(response.data.wind.speed),
        humidity: response.data.temperature.humidity,
        icon: response.data.condition.icon_url
    });
 }


 function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "4c05132bc5ac2f372o09eet8a2bb888d";
  let apiUrl =  `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
 }


 function updateCity(event) {
  setCity(event.target.value);
 }

 let form = <form onSubmit={handleSubmit}>
    <input type="text" placeholder="search a city" onChange={updateCity} />
    <input type="submit" value="search" />
 </form> 

 if (loaded) {
    return (
        <div>
            {form}
            <ul>
                <li>
                Temperature: {weather.temperature}°c  
                </li>
                <li>
                Humidity: {weather.humidity}
                </li>
                <li>
                Wind: {weather.wind}
                </li>
                <img scr={weather.icon} alt="Weather app"/>
            </ul>
            
        </div>
    )
 } else {
     return form;
 }  
}