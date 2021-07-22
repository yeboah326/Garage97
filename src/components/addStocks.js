import React, { Component } from 'react'

// import Tfooter from './tfooter'

class AddStocks extends Component{
    constructor (props){
        super(props)
       
    this.state = {
        stock_id:null,
        stock:null,
        qty:null,
        date:null
     }

   
} 
     
 
     handleChange=(e)=>{
         this.setState({
             [e.target.id]:e.target.value
         })

     }
     handleSubmit= (e)=>{
         e.preventDefault();
       let Jheight = this.props.getHeight(this.state);
       if (Jheight <823.483) {
        this.props.addRow(this.state);
        this.props.submitTrigger();}
        else {return(
            <div className="table-div"    > 
           
              { this.props.submitTrigger()}
            </div>
           
        )
        }


            
     }
  render(){

    return (this.props.trigger) ?
    
        (  <div className=" login-form popup">
        <form onSubmit={this.handleSubmit} > 
            <h1>add new stock</h1>
           <label htmlFor= "stock_id">stock_id</label>
           <input type="text" id='stock_id' onChange={this.handleChange}></input>
           <label htmlFor= "stock" >stock</label>
           <input type="text" id='stock' onChange={this.handleChange}></input>
           <label htmlFor= "qty">qty</label>
           <input type="text" id='qty' onChange={this.handleChange}></input>
           <label htmlFor= "date">date</label>
           <input type="text" id='date' onChange={this.handleChange}></input>
           <button className='button add' >add</button>
           
           


       </form>
   </div>
):"";}
    
      
}

export default AddStocks;
