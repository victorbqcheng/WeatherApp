import React from 'react'
import styles from './Container.module.css'
import Current from './Current'
import { Hourly } from './Hourly'
import Daily from './Daily'
import Indices from './Indices'


export const Container:React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Current />
        <Hourly />
      </div>
      <div className={styles.right}>
        <Daily />
        <Indices />
      </div>
    </div>
  )
}

