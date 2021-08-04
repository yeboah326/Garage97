import React, { Component } from 'react'
import Input from '../Input'

class AddSales extends Component{
    constructor (props){
        super(props)
       
    this.state = {
        sales_id:null,
        sale:null,
        qty:null,
        date:null
     }

   
} 
     
 
     handleChange=(e)=>{
         this.setState({
             [e.target.name]:e.target.value
         }
         )

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
    
        (  <div className=" form-pop">
        <form onSubmit={this.handleSubmit}  className="form-container"> 
            <h1>add new sale</h1>
            <Input type="text" name='sale_id' required={true} onChange={this.handleChange} label="sale_id"/>
            <Input type="text" name='sale' required={true} onChange={this.handleChange} label="sale"/>
            <Input type="text" name='qty' required={true} onChange={this.handleChange} label="qty"/>
            <Input type="text" name='date' required={true} onChange={this.handleChange} label="date"/>
           <button className='btn' >add</button>
           <button className='btn cancel' onClick={this.close} >close</button>


           
           


       </form>
   </div>
):"";}
    
      
}

export default AddSales;
