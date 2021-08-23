import React, { Component } from 'react'

export class Tfooter extends Component {
    render() {
        const greater = "<" ;
        const lesser = ">" ;
        return (
            <div className="Tfooter">
                <span className="greater"> {greater} </span>
                <span className="page_id"> 1 </span>
                <span className="lesser"> {lesser} </span>

            </div>
        )
    }
}

export default Tfooter
