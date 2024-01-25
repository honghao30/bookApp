import axios from 'axios';
import weatherDescKo from './weaTherKo';
import { todayData,hh,calcTime,calcHuos,todayPrint,getTodayLabel } from './weaTherTime';

const MyKey = '13b55b2bf5bf4b64df063ddbfe1f3c5c'
// const city = 'Seoul'
const getWeather = async () => {
return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=${MyKey}`)
    .then((res) => {
        console.log(res.data)
        const todayWeather = {
            weatherCode: weatherDescKo[res.data.weather[0].id],
            todaytemp: res.data.main.temp,
            todaywind: res.data.wind.speed,
            todayhumidity: res.data.main.humidity,            
            sunriseTimeIs: calcTime(res.data.sys.sunrise),
            sunsetTimeIs: calcTime(res.data.sys.sunset)
        }       
        console.log(todayWeather)
        return todayWeather; 
    })
    .catch((Error) => {
        console.log(Error);
        return null;  // Return null if there was an error
    });
}
export default getWeather;

