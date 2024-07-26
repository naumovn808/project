import React from "react";
import styles from './FilterButton.module.css'

const FilterButton = ({
    label,
    icon,
    isActive,
    onClick,
    dataAttribute
}) => {
    return (
        <button
        className={`${styles.filterButton} ${isActive ? styles.active : ''}` }
        onClick={onClick}
        data-filter={dataAttribute}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default FilterButton;