import './Title.module.css';

function Title({ children, className, ...props }) {
  let cn = className ? className + ' h1' : 'h1';

  return (
    <h1 className={cn} {...props}>
      {children}
    </h1>
  );
}

export default Title;