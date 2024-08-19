import React, { useEffect, useState } from 'react'
import styles from './Indices.module.css'

import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { accuWeather, Index } from '../api/AccuWeather';
import Tooltip from './Tooltip';

const Indices = () => {
    const locationKey = "252066";
    const [indices, setIndices] = useState<Index[]>();
    useEffect(()=>{
        accuWeather.getIndices(locationKey).then((indices)=>{
            console.log("Indices:", indices);
            setIndices(indices);
        });
    }, []);
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Indices</h2>
            <div>
                <Swiper slidesPerView={2.5}
                    spaceBetween={35}
                    freeMode={true}
                    modules={[FreeMode]}>
                    {indices?.map((weatherIndex, index) => (
                        <SwiperSlide key={index} >
                            <IndexItem weatherIndex={weatherIndex} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

type IndexItemProps = {
    weatherIndex: Index;
};

const IndexItem = ({ weatherIndex }: IndexItemProps) => {
    return (
        <div className={styles.index_item}>
            <Tooltip text={weatherIndex.Text}>
                <h6 className='index_name'>{weatherIndex.Name}</h6>
                <div className='index_value'>{weatherIndex.Value}</div>
                <div>{weatherIndex.Category}</div>
            </Tooltip>
        </div>
    );
};

export default Indices