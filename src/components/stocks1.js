import React, { Component } from 'react'
// import { useState } from 'react';

import AddButton from './ProductDashboard/AddButton'
import SideNavBar from './BusinessesDashboard/SideNavBar'
import TableHead from './tableHead'
import TableRow from './tableRow'
import AddStocks from './addStocks';


class Stocks1 extends Component {
  constructor(props){
      super(props);
      this.state = {
          rows:[
              {stock_id:3, stock:'stock',qty:'qty',date:'date' },
              {stock_id:34, stock:'stock',qty:'qty',date:'date' },
              {stock_id:345, stock:'stock',qty:'qty',date:'date' },
              {stock_id:36, stock:'stock',qty:'qty',date:'date' },
              {stock_id:35, stock:'stock',qty:'qty',date:'date' }
              ,{stock_id:35, stock:'stock',qty:'qty',date:'date' }

        ],
      addRow : (eachRow)=>{
            let tempRows = [...this.state.rows,eachRow];
            this.setState({
                rows:tempRows
            })
          }}
      
      
  }
 
  

render(){
    return (
        <div className="stocks-body">
                        <div className="sidebar"> <SideNavBar/> </div>

                        <div className="table-div"  > 
                        <h1>Stocks</h1>
                        < TableHead />
                        <TableRow rowData={this.state.rows}/>
                        
                        </div>
                        <div  className='adder'> 
                        <AddButton onClick={this.handleClick}/>
                         <AddStocks trigger = {true} addRow = {this.state.addRow}/>
                        </div>



        </div>
        
        
        
        )
}
    
    
    
    
    
    
    }
    export  default Stocks1;