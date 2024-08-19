import React, { useEffect, useState } from 'react'
import styles from './Daily.module.css'

import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { accuWeather, DailyForecast } from '../api/AccuWeather';
import Tooltip from './Tooltip';

const Daily:React.FC = () => {
    const locationKey = "252066";
    const [forecasts, setForecasts] = useState<DailyForecast[]>();
    useEffect(() => {
        accuWeather.getDailyForecast(locationKey).then((forecasts) => {
            setForecasts(forecasts);
        }).catch((_error) => { });
    }, []);
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Daily</h2>
            <div>
                <Swiper slidesPerView={2.5}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode]}>
                    {forecasts?.map((forecast, index) => (
                        <SwiperSlide key={index}>
                            <DailyItem forecast={forecast} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Daily

type DailyItemProps = {
    forecast: DailyForecast;
};

const DailyItem = ({ forecast }: DailyItemProps) => {
    const date = new Date(forecast.Date);
    return (
        <div className={styles.daily_item}>
            <div className="day">{date.getMonth() + 1} / {date.getDate()}</div>
            <div className="temp_range">
                <span className="high">{forecast.Temperature.Maximum.Value} / </span>
                <span className="low">{forecast.Temperature.Minimum.Value}°C</span>
            </div>
            <DayNightItem info={forecast.Day} />
            {/* <div style={{ margin: '10px' }}></div>
            <DayNightItem info={forecast.Night}/> */}
        </div>
    );
};

type DayNightItemProps = {
    info: {
        Icon: number;
        IconPhrase: string;
    }
};

const DayNightItem = ({ info }: DayNightItemProps) => {
    const [icon, setIcon] = useState<string>();
    useEffect(() => {
        import(`../assets/icons/weather/accuweather/${info.Icon}-s.png`).then(icon => {
            setIcon(icon.default);
        });
    }, []);
    return (
        <>
            <div className='daily-icon' style={{display:'inline'}}>
                <Tooltip text={info.IconPhrase}>
                    <img src={icon} style={{ width: "60px", height:'36px'}} alt="" />
                </Tooltip>
            </div>

        </>
    );
};
