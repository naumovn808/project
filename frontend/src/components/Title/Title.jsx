import styles from './Title.module.css';
import cn from 'classnames';


function Title({ children, className, ...props }) {
    return (
        <h1 className={cn(className, styles['h1'])} {...props}>{children}</h1>
    );
}

export default Title;