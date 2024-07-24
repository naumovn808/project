import React from "react";
import { X, } from "lucide-react";
import styles from './popUpNotification.module.css'

const popUpNotification = ({
    message,
    isSuccess = true,
    onClose,
    backgroundColor = '#48455F',
    textColor = '#fff',
    iconColor = '#fff'
}) => {
    return (
        <div className={styles.popup} style={{ backgroundColor, color: textColor }}>
        <div className={`${styles.leftBorder} ${isSuccess ? styles.success : styles.error}`}></div>
        <div className={styles.icon}>
          {isSuccess ? (
            <svg className={styles.checkIcon} viewBox="0 0 24 24" width="24" height="24">
              <circle cx="12" cy="12" r="10" fill="none" stroke={iconColor} strokeWidth="2"/>
              <path d="M7 13l3 3 7-7" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <X color={iconColor} size={24} />
          )}
        </div>
        <p className={styles.message}>{message}</p>
        <button className={`${styles.closeButton} ${styles.outlinedClose}`} onClick={onClose}>
          <X color={textColor} size={20} />
        </button>
      </div>   
    );
};

export default popUpNotification;