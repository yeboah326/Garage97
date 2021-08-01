import React, { Component } from 'react'
import AddButton from '../ProductDashboard/AddButton'
import SideNavBar from '../ProductDashboard/SideNavBar'
import TableHead from './tableHead'
import TableRow from './tableRow'
import AddStocks from './addStocks'
import Tfooter from "./tfooter"
// import  {useRef } from 'react'



class Stocks2 extends Component {
  constructor(props){
      super(props);
      this.state = {
        products:[],
        stocklist:[],
          rows:[
              

        ],
      addRow : (eachRow)=>{
            let tempRows = [eachRow,...this.state.rows,];
            this.setState({
                rows:tempRows
            })
          },
      trigger:false,
      setTrigger: (trigger) =>{
         this.setState(
            {trigger:!trigger})}
            ,
        submitTrigger : (trigger) =>{
          this.setState(
             {trigger:trigger})},

        getHeight:()=> {
            const height = this.divElement.clientHeight;
            this.setState({ height });
            return height
            },
        business_id : JSON.parse(localStorage.getItem('business_id')),
        token: JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
         }
         
        }
        
       
       
      
      handleClick =(e)=>{
        this.state.setTrigger();

      }

      fetchStockList = async() => {
        const response = await fetch(`http://localhost:9000/${this.state.business_id}/stock_list`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${this.state.token}`
          }
        })
        const res = await response.json
        this.setState({stocklist:res.business_stock_lists})
      }
      // openForm=(e) =>{
      //   document.getElementById("myForm").style.display = "block";
      // }
      
    

   

  

render(){
  // const [buttonPop,setButtonPop] = useState(false);

    return (
        <div className="stocks-body">
                        {/*<div className="sidebar">*/} <SideNavBar/> {/* </div> */}

                        <div className="table-div"  ref={ (divElement) => { this.divElement = divElement } }  > 
                        <h1>Stocks</h1>
                        < TableHead />
                        <TableRow rowData={this.state.rows}/>
                        <Tfooter/>
                        </div>
                        <div  className='adder' onClick={this.handleClick} > 
                        <AddButton />
                         
                        </div>
                        
                        <AddStocks trigger = {this.state.trigger} addRow = {this.state.addRow} submitTrigger={this.state.submitTrigger} getHeight={this.state.getHeight} openForm={this.openForm}/>

                        

        </div>
        
        
        
        )
}
    
    
    
    
    
    
    }
    export  default Stocks2;