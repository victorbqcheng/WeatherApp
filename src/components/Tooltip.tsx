import React, { useState } from 'react'
import styles from './Tooltip.module.css'

type TooltipProps = {
    children: React.ReactNode;
    text?: string|null;
    className?: string;
    style?: React.CSSProperties;
}

const Tooltip = ({ children, text, className, style }: TooltipProps) => {
    const [show, setShow] = useState(false);
    const handleMouseEnter = () => {
        setShow(true);
    };

    const handleMouseLeave = () => {
        setShow(false);
    };
    return (
        <div onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{}}
            className={`${styles.tooltip_container} ${className}`}>
            {children}
            <div style={{...style, ...(show?{opacity:1}:{})}} className={`${styles.tooltip} ${styles.tooltip_show}`}>{text}</div>
        </div>
    )
}

export default Tooltip