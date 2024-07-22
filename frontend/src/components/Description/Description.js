import classNames from 'classnames';
import './Description.module.css';

function Description({ children, className, ...props }) {
  // let cn = className ? className + 'desc' : 'desc'; //! before
  let cn = classNames(className, 'desc')


  return (
    <p className={cn} {...props}>
      {children}
    </p>
  );
}

export default Description;