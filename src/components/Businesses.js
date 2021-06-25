import React from 'react'
import Business from './Business'

const Businesses = () => {
    const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana"
    return (
        <div className="businesses">
            <Business name="Kako Inc." description={description}/>
            <Business name="Kako Inc." description={description}/>
            <Business name="Kako Inc." description={description}/>
            <Business name="Kako Inc." description={description}/>
            <Business name="Kako Inc." description={description}/>
        </div>
        
    )
}

export default Businesses
