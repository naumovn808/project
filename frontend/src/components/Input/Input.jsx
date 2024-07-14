import React from 'react'
import cn from 'classnames'
import styles from './Input.module.css'

const Input = ({className,...props}) => {

   
  // const sign = 

  return (
        <label htmlFor="">
                 <input className={cn(styles.input, className)} {...props} />    
        </label>
  )

}

export default Input;