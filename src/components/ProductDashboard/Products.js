import React from 'react'
import Product from './Product'
import AddButton from './AddButton'

const Businesses = () => {
    const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana"
    return (
        <div className="business-section">
            <div className="businesses">
                <Product name="Kako Bingi" description={description}/>
                <Product name="Kako Grawgraw" description={description}/>
                <Product name="Kako Pro Max" description={description}/>
                <Product name="Kako Granula" description={description}/>
                <Product name="Kako Toppings" description={description}/>
                <Product name="Kako Mini" description={description}/>
                <Product name="Kako Papa" description={description}/>
                <Product name="Kako Cube" description={description}/>
                <Product name="Kako Cube Mini" description={description}/>
                <Product name="Kako Cube Pro" description={description}/>
            </div>
            <div className="addButtonSection">
                <AddButton/>
            </div>
        </div>
        
    )
}

export default Businesses
