import React from 'react'

const Button = ({name,color,toggle}) => {
    return (
       <button className="button" style={{backgroundColor:color}} onClick={toggle}>
           {name}
       </button>
    )
}

export default Button
