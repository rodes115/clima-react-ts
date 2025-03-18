import axios from "axios"
import { SearchType } from "../types"
import type { WeatherType } from "../types"

function isWeatherResponse(weather : unknown) : weather is WeatherType {
     return (
          Boolean(weather) &&
          typeof weather === 'object' &&
          typeof (weather as WeatherType).name === 'string' &&
          typeof (weather as WeatherType).main.temp === 'number' &&
          typeof (weather as WeatherType).main.temp_max === 'number' &&
          typeof (weather as WeatherType).main.temp_min === 'number' 
     )
}


export default function useWeather() {
     
     const fetchWeather = async (search: SearchType) => {
          
          const appId = import.meta.env.VITE_API_KEY
          try{
               const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
               
               const {data} = await axios.get(geourl)

               const lat = data[0].lat
               const lon = data[0].lon
               
               const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`


               //Castear el type de la respuesta
                    //const {data : weatherData} = await axios<WeatherType>(weatherUrl)
                    //console.log(weatherData.main.temp)
                    //console.log(weatherData.name)

               // Type Guard
                    const {data : weatherData} = await axios(weatherUrl)
                    const result = isWeatherResponse(weatherData)
                    if(result){
                         console.log(weatherData.name)
                         console.log(weatherData.main.temp)
                    }

          }catch(error){
               console.log(error)
          }
     }
     
     return{
          fetchWeather
     }
}