import React from 'react'
import styles from './Container.module.css'
import Current from './Current'


export const Container:React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Current />
      </div>
      <div className={styles.right}>
      </div>
    </div>
  )
}

