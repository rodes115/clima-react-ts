import { useMemo, useState } from "react"
import axios from "axios"
import { z } from 'zod'
//import {object , string, number, InferOutput as Output, parse} from 'valibot' 
import { SearchType, WeatherType } from "../types"


//function isWeatherResponse(weather : unknown) : weather is WeatherType {
//     return (
//          Boolean(weather) &&
//          typeof weather === 'object' &&
//          typeof (weather as WeatherType).name === 'string' &&
//          typeof (weather as WeatherType).main.temp === 'number' &&
//          typeof (weather as WeatherType).main.temp_max === 'number' &&
//          typeof (weather as WeatherType).main.temp_min === 'number' 
//     )
//}

//ZOD

const Weather = z.object({
     name: z.string(),
     main: z.object({
          temp: z.number(),
          temp_max: z.number(),
          temp_min: z.number(),
     })
})

export type Weather = z.infer<typeof Weather>

//Valibot
/*
const WeatherSchema = object({
     name: string(),
     main: object({
          temp: number(),
          temp_max: number(),
          temp_min: number(),
     })
})

type Weather = Output<typeof WeatherSchema>
*/

const initialState = {
     name: '',
     main: {
          temp: 0,
          temp_max: 0,
          temp_min: 0
     }
}

export default function useWeather() {

     const [weather, setWeather] = useState<WeatherType>(initialState)
     const [loading, setLoading] = useState(false)
     const [notFound,setNotFound] = useState(false)



     const fetchWeather = async (search: SearchType) => {

          const appId = import.meta.env.VITE_API_KEY

          setLoading(true)
          setWeather(initialState)


          try {
               const geourl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

               const { data } = await axios.get(geourl)

               //comprobar si existe
               if(!data[0])
               {
                    setNotFound(true)
                    return
               }

               const lat = data[0].lat
               const lon = data[0].lon

               const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`


               //Castear el type de la respuesta
               //const {data : weatherData} = await axios<WeatherType>(weatherUrl)
               //console.log(weatherData.main.temp)
               //console.log(weatherData.name)

               // Type Guard
               //const {data : weatherData} = await axios(weatherUrl)
               //const result = isWeatherResponse(weatherData)
               //if(result){
               //     console.log(weatherData.name)
               //     console.log(weatherData.main.temp)
               //}

               // Zod

               const { data: weatherData } = await axios(weatherUrl)
               const result = Weather.safeParse(weatherData)
               if (result.success) {
                    setWeather(result.data)
               }


               //Valibot
               /*
               const {data:weatherData} = await axios(weatherUrl)
               const result = parse(WeatherSchema, weatherData)
               if(result){
                    console.log(result.name)
                    console.log(result.main.temp)
               }
               */

          } catch (error) {
               console.log(error)
          } finally {
               setLoading(false)
          }
     }

     const hasWeatherData = useMemo(() =>
          weather.name, [weather])

     return {
          weather,
          loading,
          notFound,
          hasWeatherData,
          fetchWeather
     }
}