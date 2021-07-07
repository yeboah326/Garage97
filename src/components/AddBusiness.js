import React from 'react'
import Input from './Input'
import Button from './Button'

const AddBusiness = () => {
    return (
        <div className="add">
            <p>Add Business</p>
            <Input label="Name" type="text"/>
             <label>Description</label>
             <textarea></textarea>
             <div className="button-div"><Button name="Add" color="#273475"/><Button name="Cancel" color="red"/></div>
              

        </div>
    )
}

export default AddBusiness
