import React from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

const Button = ({ className, title, ...props }) => {
    return (
        <button className={cn(styles.button, className)} {...props}>{title}</button>
    );
}

export default Button;
