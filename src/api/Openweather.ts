import { OPEN_WEATHER_API_KEY } from "../keys";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const APP_ID = OPEN_WEATHER_API_KEY;

export type Current = {
    weather:[
        {
            description: string;
            icon: string;
        }
    ];
    main:{
        temp:number;
        feels_like:number;
        humidity:number;
    };
    wind:{
        speed:number;
        deg:number;
        gust:number;
    };
};

class Openweather{
    public async getCurrentConditions():Promise<Current> {
        const response = await fetch(
            `${BASE_URL}?appid=${APP_ID}&lat=-36.852095&lon=174.7631803&units=metric`
        )
        const data = (await response.json()) as Current;


        return data;
    }
    // public async get12HourlyForecast(locationKey: string):Promise<HourlyForecast[]> {
    //     const response = await fetch(
    //         `${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}&details=true&metric=true`
    //     )
    //     const data = await response.json()
    //     return data;
    // }
}

export const openweather = new Openweather();