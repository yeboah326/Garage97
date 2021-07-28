import React, { Component } from 'react'
import Input from '../Input'


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
             [e.target.name]:e.target.value
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
     close=(e)=>{this.props.submitTrigger()}
     
  render(){

    return (this.props.trigger) ?
    
        ( 
             <div className=" form-pop" id="myForm" >
        <form onSubmit={this.handleSubmit} className="form-container"  > 
            <h1>add new stock</h1>
            <Input type="text" name='stock_id' required="true" onChange={this.handleChange} label="stock_id"/>
            <Input type="text" name='stock' required="true" onChange={this.handleChange} label="stock"/>
            <Input type="text" name='qty' required="true" onChange={this.handleChange} label="qty"/>
            <Input type="text" name='date' required="true" onChange={this.handleChange} label="date"/>

           <button className='btn ' >add</button>
           <button className='btn cancel'  onClick={this.close}>close</button>




           
           


       </form>
   </div>
):"";}
    
      
}

export default AddStocks;
