import React, { useEffect, useState } from 'react'
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Hourly.module.css'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { HourlyForecast } from '../api/AccuWeather'; 
import { accuWeather } from '../api/AccuWeather';
import Tooltip from './Tooltip';


export const Hourly:React.FC = () => {
    const locationKey = "252066";
    const [forecasts, setForecasts] = useState<HourlyForecast[]>();
    useEffect(() => {
        accuWeather.get12HourlyForecast(locationKey).then((forecasts) => {
            // console.log("12 Hourly Forecast:", forecast);
            setForecasts(forecasts);
        });

    }, []);
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{forecasts?.length} Hours</h2>
            <div>
                <Swiper slidesPerView={4.5}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode]}>
                    {forecasts?.map((forecast, index) => (
                        <SwiperSlide key={index} >
                            <HourlyItem forecast={forecast} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

type HourlyItemProps = {
    forecast: HourlyForecast;
};

const HourlyItem = ({ forecast }: HourlyItemProps) => {
    const [icon, setIcon] = useState<string>();
    useEffect(() => {
        import(`../assets/icons/weather/accuweather/${forecast.WeatherIcon}-s.png`).then(icon => {
            setIcon(icon.default);
        });
    }, []);
    const dateTime = new Date(forecast.DateTime);
    return (
        <div className={styles.hourly_item}>
            <div className='hourly_time'>{dateTime.getHours()}:00</div>
            <div className='hourly_temp'>{forecast.Temperature.Value}°C</div>
            <div className='hourly_icon'>
                <Tooltip text={forecast.IconPhrase}>
                <img src={icon} style={{ width: "60px", color: "orange" }} alt="" />
                </Tooltip>
            </div>
        </div>
    )
};
