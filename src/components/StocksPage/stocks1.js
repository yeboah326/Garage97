import React, { Component } from 'react'
import AddButton from '../ProductDashboard/AddButton'
import SideNavBar from '../ProductDashboard/SideNavBar'
import TableHead from './tableHead'
import TableRow from './tableRow'
import AddStocks from './addStocks'
import Tfooter from "./tfooter"
// import  {useRef } from 'react'



class Stocks1 extends Component {
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
            }
         }
        }
       
       
      
      handleClick =(e)=>{
        this.state.setTrigger();

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
    export  default Stocks1;