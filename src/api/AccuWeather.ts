
import { USE_FAKE_DATA } from "../Config";
import { ACCU_WEATHER_API_KEY } from "../keys";
import { AccuWeatherData } from "./testdata";

const BASE_URL = 'https://dataservice.accuweather.com';
const API_KEY = ACCU_WEATHER_API_KEY;

export type CurrentConditions = {
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType?: string | null;
    RelativeHumidity: number;
    Wind: {
        Speed: {
            Metric: {
                Value: number;
                Unit: string;
            }
        }
    };
    Temperature: {
        Metric: {
            Value: number;
            Unit: string;
        }
    }
}

export type HourlyForecast = {
    DateTime: string;
    WeatherIcon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string | null;
    Temperature: {
        Value: number;
        Unit: string;
    }
};

export type DailyForecast = {
    Date: string;
    Temperature: {
        Minimum: {
            Value: number,
            Unit: "C"
        },
        Maximum: {
            Value: number,
            "Unit": "C",
        }
    };
    RealFeelTemperature: {
        Minimum: {
            Value: number,
            Unit: "C",
            Phrase: string
        },
        Maximum: {
            Value: number,
            Unit: "C",
            Phrase: string
        }
    };
    Day: {
        Icon: number,
        IconPhrase: string,
        Wind: {
            Speed: {
                Value: number,
                Unit: string,
            },
            Direction: {
                Degrees: number,
                Localized: string,
                English: string
            }
        }
    };
    Night: {
        Icon: number,
        IconPhrase: string,
        Wind: {
            Speed: {
                Value: number,
                Unit: string,
            },
            Direction: {
                Degrees: number,
                Localized: string,
                English: string
            }
        }
    };
};

export type Index = {
    Name: string;
    Value: number;
    Category: string;
    CategoryValue: number;
    Text?: string | null;
};

class AccuWeather {
    constructor(private apiKey: string, private baseUrl: string) { }

    public async getLocations(location: string) {
        const response = await fetch(
            `${this.baseUrl}/locations/v1/cities/search?q=${location}&apikey=${this.apiKey}`
        )
        const data = await response.json()
        console.log("Locations:", data);
    }

    public async getCurrentConditions(locationKey: string): Promise<CurrentConditions> {

        if (USE_FAKE_DATA) {
            const data = AccuWeatherData.current;
            return (data[0] as CurrentConditions);
        }
        else {
            const response = await fetch(
                `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
            )
            const data = await response.json()
            return (data[0] as CurrentConditions);
        }
    }
    public async get12HourlyForecast(locationKey: string): Promise<HourlyForecast[]> {

        if (USE_FAKE_DATA) {
            const data = AccuWeatherData.hourly
            return data;
        }
        else {
            const response = await fetch(
                `${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}&details=true&metric=true`
            )
            const data = await response.json()

            return data;
        }
    }
    public async getDailyForecast(locationKey: string): Promise<DailyForecast[]> {
        if (USE_FAKE_DATA) {
            const data = AccuWeatherData.daily;
            return (data.DailyForecasts as DailyForecast[]);
        }
        else {
            const response = await fetch(
                `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&details=true&metric=true`
            );
            const data = await response.json();
            return (data.DailyForecasts as DailyForecast[]);
        }

    }

    public async getIndices(locationKey: string): Promise<Index[]> {
        if (USE_FAKE_DATA) {
            const data = AccuWeatherData.groupOfIndices1;
            return data;
        } else {
            const response = await fetch(
                `${BASE_URL}/indices/v1/daily/1day/${locationKey}/groups/1?apikey=${API_KEY}&details=true`);
            const data = await response.json();
            return data;
        }

    }
}

export const accuWeather = new AccuWeather(API_KEY, BASE_URL);