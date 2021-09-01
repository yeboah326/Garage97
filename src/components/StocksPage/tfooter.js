import React, { Component } from 'react'

function Tfooter({page,max_page,setPage}){
    const greater = "<" ;
    const lesser = ">" ;
    
    const Increment = () => {
        if(page < max_page){
            setPage(++page)
        }
    }

    const Decrement = () => {
        if (page !== 1){
            setPage(--page)
        }
    }
        return (
            <div className="Tfooter">
                <span className="greater" onClick={Decrement}> {greater} </span>
                <span className="page_id"> {page} </span>
                <span className="lesser" onClick={Increment}> {lesser} </span>
            </div>
        )
    
}

export default Tfooter
