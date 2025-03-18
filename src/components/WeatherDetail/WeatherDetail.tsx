import { Weather } from "../../Hooks/useWeather";
import { formatTemperature } from "../../utils";
import styles from './WeatherDetail.module.css'

type WeatherDetailsProps = {
    weather: Weather
}


export default function WeatherDetail({ weather }: WeatherDetailsProps) {
    return (
        <div className={styles.container}>
            <h1>Clima de:{weather.name}</h1>
            <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
            <div className={styles.temperatures}>
                <p>min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
                <p>min: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
            </div>
        </div>
    )
}
