import React, { Component } from 'react'

export class Tfooter extends Component {
    render() {
        let greater = "<" ;
        let lesser = ">" ;
        return (
            <div className="Tfooter">
                <div className="greater"> {greater} </div>
                <div className="page_id"> <p>   1   </p> </div>
                <div className="lesser"> {lesser} </div>

            </div>
        )
    }
}

export default Tfooter
