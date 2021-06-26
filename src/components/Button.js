import React from 'react'

const Button = ({name,color}) => {
    return (
       <button className="button" style={{backgroundColor:color}}>
           {name}
       </button>
    )
}

export default Button
