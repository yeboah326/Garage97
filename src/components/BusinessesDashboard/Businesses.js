import React from 'react'
import Business from './Business'
import AddButton from './AddButton'

const Businesses = () => {
    const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        <div className="business-section">
            <div className="businesses">
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
            </div>
            <div className="addButtonSection">
                <AddButton/>
            </div>
        </div>
        
    )
}

export default Businesses
