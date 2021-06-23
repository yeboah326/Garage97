import React from 'react'


const Input = ({type,required,label}) => {
    return (
        <div>
            <label className="label">{label}</label>
            <input type={type} required={required}  />
        </div>
    )
}


export default Input
