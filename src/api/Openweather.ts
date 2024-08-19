import { USE_FAKE_DATA } from "../Config";
import { OPEN_WEATHER_API_KEY } from "../keys";
import { OpenweatherData } from "./testdata";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const APP_ID = OPEN_WEATHER_API_KEY;


export type Current = {
    weather:
    {
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
};

class Openweather {
    public async getCurrentConditions(): Promise<Current> {
        if (USE_FAKE_DATA) {
            const data = OpenweatherData.current;
            return data as Current;
        }
        else {
            const response = await fetch(
                `${BASE_URL}?appid=${APP_ID}&lat=-36.852095&lon=174.7631803&units=metric`
            )
            const data = (await response.json()) as Current;
            return data;
        }

    }
}

export const openweather = new Openweather();