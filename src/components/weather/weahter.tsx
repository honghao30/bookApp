import React, { useEffect, useState } from 'react'
// import getWeather from '../../api/weather/getWeather';
import getWeather from '../../api/weather/getWeather'

interface Weather {
    weatherCode: any;
    todaytemp: any;
    todaywind: any;
    todayhumidity: any;
    sunriseTimeIs: string;
    sunsetTimeIs: string;
  }

const Weather: React.FC = () => {
    const [weather, setWeather] = useState<Weather | null>(null)

    useEffect(() => {
      getWeather().then(weatherData => {
        setWeather(weatherData);
      });
    }, []);
    

    return (
        <div className="weather-card">
                  {weather && (
                    <div>
                    <p>날씨 코드: {weather.weatherCode}</p>
                    <p>오늘의 온도: {weather.todaytemp}</p>
                    <p>오늘의 풍속: {weather.todaywind}</p>
                    <p>오늘의 습도: {weather.todayhumidity}</p>
                    <p>일출 시간: {weather.sunriseTimeIs}</p>
                    <p>일몰 시간: {weather.sunsetTimeIs}</p>
                    </div>
                )}
        </div>
    )
}

export default Weather