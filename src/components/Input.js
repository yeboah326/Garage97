import React from 'react'


const Input = ({type,required,label,name,onChange}) => {
    return (
        <div>
            <label className="label">{label}</label>
            <input type={type} required={required} name={name} onChange={onChange}/>
        </div>
    )
}


export default Input
