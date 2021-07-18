import React, { Component } from 'react'

class AddStocks extends Component{
    constructor (props){
        super(props)
       
    this.state = {
        stock_id:null,
        stock:null,
        qty:null,
        date:null
     }}
     
     handleChange=(e)=>{
         this.setState({
             [e.target.id]:e.target.value
         })
     }
     handleSubmit= (e)=>{
         e.preventDefault();
        this.props.addRow(this.state);
        this.props.submitTrigger();
        console.log(this.props.trigger)
     }
  render(){

    return (this.props.trigger) ?
    
        (  <div className="  popup">
        <form onSubmit={this.handleSubmit} >
           <label htmlFor= "stock_id">stock_id</label>
           <input type="text" id='stock_id' onChange={this.handleChange}></input>
           <label htmlFor= "stock" >stock</label>
           <input type="text" id='stock' onChange={this.handleChange}></input>
           <label htmlFor= "qty">qty</label>
           <input type="text" id='qty' onChange={this.handleChange}></input>
           <label htmlFor= "date">date</label>
           <input type="text" id='date' onChange={this.handleChange}></input>
           <button id='login' >submit</button>
           
           


       </form>
   </div>
):"";}
    
      
}

export default AddStocks;
