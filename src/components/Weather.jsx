import { useEffect, useState } from 'react'
import '../components/weather.css'
import axios from 'axios'

import Lottie from "lottie-react";

import sunny from "../animations/sunny.json";
import cloudy from "../animations/cloudy.json";
import rain from "../animations/rain.json";
import thunder from "../animations/thunder-storm.json";
import snow from "../animations/snowy.json";
import SearchBar from './SearchBar';

function Weather() {

    const [weatherData, setWeatherData] = useState(null)
    const [city, setCity] = useState('Dhaka')

    async function getWeatherData(cityName) {
        try {
            const weatherApi = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR_API_KEY`);
            setWeatherData(weatherApi.data)
        } catch (error) {
            alert("City not found.")
            setWeatherData(null)
        }
    }

    useEffect(() => {
        getWeatherData(city);

        const interval = setInterval(() => {
            getWeatherData(city);
        }, 300000); // every 5 minutes

        return () => clearInterval(interval); // cleanup
    }, [city]);


    const handleSearch = (cityName) => {
        if (cityName.trim()) {
            setCity(cityName);
        }
    };

    const getLocalTime = () => {
        const utcTimestamp = weatherData.dt * 1000; // convert to ms
        const offsetMs = weatherData.timezone * 1000;
        const localDate = new Date(utcTimestamp + offsetMs);

        return localDate.toUTCString().replace(/:\d{2}(?= GMT)/, '');
    };

    function getWeatherAnimation(main) {
        switch (main) {
            case "Clear":
                return sunny;
            case "Clouds":
                return cloudy;
            case "Rain":
            case "Drizzle":
                return rain;
            case "Thunderstorm":
                return thunder;
            case "Snow":
                return snow;
            case "Mist":
            case "Fog":
            case "Haze":
                return cloudy;
            default:
                return 'cloudy';
        }
    }

    return (
        <>
            {
                weatherData && weatherData.main ? (
                    <div className='weather-box'>
                        <div className='box weather-box-content-1'>
                            <h2>{weatherData.weather[0].main}</h2>
                            {/* <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather-icon" id='weather-icon' /> */}
                            <Lottie
                                animationData={getWeatherAnimation(weatherData.weather[0].main)}
                                loop={true}
                                style={{ width: 150, height: 150 }}
                            />
                            <div>
                                <h3>{weatherData.name}, {weatherData.sys.country}</h3>
                                <h4>{
                                    getLocalTime()
                                }</h4>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className='box weather-box-content-2'>
                            <div className='title-box'>
                                <img src="src/images/clear-sky.png" alt="logo-icon" id='logo-icon' />
                                Weather Lite
                            </div>
                            <div className='data'>
                                <h4 className='data-text data-temp'>{weatherData.main.temp} <span className='data-metric'>°C</span> <br /> <span className='data-title'>Temperature</span></h4>
                                <h4 className='data-text data-wind'>{(weatherData.wind.speed * 3.6).toFixed(1)} <span className='data-metric'>kmph</span> <br /><span className='data-title'>Wind</span></h4>
                            </div>
                            <SearchBar onSearch={handleSearch}></SearchBar>
                        </div>
                    </div>
                ) : (
                    <p>Loading data...</p>
                )
            }

        </>
    )
}

export default Weather