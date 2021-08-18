import React from 'react'


const Input = ({type,required,label,name,onChange,min,step,minlength,maxlength,pattern,defaultValue}) => {
    return (
        <div>
            <label className="label">{label}</label>
            <input type={type} required={required} name={name} onChange={onChange} min={min} step={step} minLength={minlength} maxLength={maxlength} pattern={pattern} defaultValue={defaultValue}/>
        </div>
    )
}


export default Input
