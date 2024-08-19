import React, { useEffect, useState } from 'react'
import styles from './Current.module.css'

import { Current as CurrentConditions, openweather } from '../api/Openweather';

const Current:React.FC = () => {
    const [icon, setIcon] = useState<string>();
    const [conditions, setConditions] = useState<CurrentConditions>();
    useEffect(()=>{
        openweather.getCurrentConditions().then((conditions)=>{
            console.log("Conditions:", conditions);
            setConditions(conditions);
            import(`../assets/icons/weather/openweather/${conditions.weather[0].icon}@2x.png`).then(icon=>{
                console.log("icon:", icon);
                setIcon(icon.default);
            });
        });
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Now</h2>
            <div className={styles.weather_info}>
                <div className={styles.info}>
                    <div>{conditions?.main.temp}°C</div>
                    <div>{conditions?.weather[0].description}</div>
                    <div>
                        <div>Humidity: {conditions?.main.humidity}</div>
                        <div>Wind: {conditions?.wind.speed} m/s</div>
                    </div>
                </div>
                <div>
                    <img src={icon} style={{ width: "75px", height: "45px", color: "orange" }} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Current