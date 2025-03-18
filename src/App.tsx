import Alert from './Alert/Alert'
import styles from './App.module.css'
import Form from './components/form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './Hooks/useWeather'


function App() {

  const {weather,loading,notFound,hasWeatherData,fetchWeather} = useWeather()


  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather}/>
        {loading && <Spinner/>}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>No se encontraron resultados.</Alert>}
      </div>
    </>
  )
}

export default App
