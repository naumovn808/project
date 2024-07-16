import './Description.module.css';

function Description({ children, className, ...props }) {
  let cn = className ? className + 'desc' : 'desc';

  return (
    <p className={cn} {...props}>
      {children}
    </p>
  );
}

export default Description;