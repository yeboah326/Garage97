import React, { Component } from 'react'
import AddButton from '../ProductDashboard/AddButton'
import SideNavBar from '../ProductDashboard/SideNavBar'
import TableHead from '../salesPage/SalesHead'
import TableSales from './tableSales'
import AddSales from '../salesPage/addsSales'
import Tfooter from "../StocksPage/tfooter"
// import  {useRef } from 'react'



class Sales extends Component {
  constructor(props){
      super(props);
      this.state = {
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
      
    

   

  

render(){
  // const [buttonPop,setButtonPop] = useState(false);

    return (
        <div className="stocks-body">
                        <div className="sidebar"> <SideNavBar/> </div>

                        <div className="table-div"  ref={ (divElement) => { this.divElement = divElement } }  > 
                        <h1>Sales</h1>
                        < TableHead />
                        <TableSales rowData={this.state.rows}/>
                        <Tfooter/>
                        </div>
                        <div  className='adder' onClick={this.handleClick} > 
                        <AddButton />
                         
                        </div>
                        <AddSales trigger = {this.state.trigger} addRow = {this.state.addRow} submitTrigger={this.state.submitTrigger} getHeight={this.state.getHeight}/>

                        

        </div>
        
        
        
        )
}
    
    
    
    
    
    
    }
    export  default Sales;