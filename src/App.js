import SplashPage from './components/Login_Registration/splashPage'
// import Stocks from './components/Stocks'
import StockPage from './components/StocksPage/stocks1'
import SalesPage from './components/salesPage/sales'
import LoginForm from './components/Login_Registration/LoginForm'
import RegistrationForm from './components/Login_Registration/RegistrationForm'
import {BrowserRouter as Router,Switch, Route, Redirect} from 'react-router-dom'
import BusinessesDashboard from './components/BusinessesDashboard/BusinessesDashboard'
import BusinessPage from './components/BusinessesDashboard/BusinessPage'
import ProductsPage from './components/ProductDashboard/ProductsPage'
import {useAuth} from './auth/index'
import Overview from './components/Overview/Overview'
import AddSales from './components/salesPage/AddSales'
import AddStocks from './components/StocksPage/AddStocks'
import SalesListPage from './components/salesPage/saleList'
import StockListPage from './components/StocksPage/stockList'
import EditStockList from './components/StocksPage/EditStockList'
import EditSaleList from './components/salesPage/EditSaleList'
import About from './components/Login_Registration/about'
import Customers from './components/Customers/Customers'
import Reports from './components/Report/Reports'
import BusinessReport from './components/Report/BusinessReport'
import ProductReport from './components/Report/ProductReport'



function App() {
  const PrivateRoute = ({component: Component, ...rest}) => {
    const [logged] = useAuth()
    return (
      <Route {...rest} render={(props) => (
        logged ? <Component {...props}/>
        : <Redirect to='/login'/>
      )} />
    )
  }

  return (

    <Router>
      <Switch>
     
          <div className='container'>
            <Route exact path = '/' component={SplashPage}/>
            <Route exact path = '/login'component={LoginForm}/>
            <Route exact path = '/about' component={About}/>
            <Route exact path = '/register' component={RegistrationForm}/>
            <Route exact path = '/businessreport' component={BusinessReport}/>
            <Route exact path = '/productreport' component={ProductReport}/>

            <PrivateRoute exact path = '/home' component={BusinessesDashboard}/> 
            <PrivateRoute exact  path = '/businesses' component={BusinessPage}/>
            <PrivateRoute exact path='/business/products' component={ProductsPage}/>
            <PrivateRoute exact path='/business/overview' component={Overview}/>
            <PrivateRoute exact path = '/business/stocks'component={StockPage}/>
            <PrivateRoute exact path = '/business/sales'component={SalesPage}/>
            <PrivateRoute exact path = '/business/sales/addsales'component={AddSales}/>
            <PrivateRoute exact path = '/business/stocks/addstocks'component={AddStocks}/>
            <PrivateRoute exact path = '/business/stocks/stocklist'component={StockListPage}/>
            <PrivateRoute exact path = '/business/sales/salelist'component={SalesListPage}/>
            <PrivateRoute exact path = '/business/stocks/editstocklist'component={EditStockList}/>
            <PrivateRoute exact path = '/business/sales/editsalelist'component={EditSaleList}/>
            <PrivateRoute exact path = '/business/customers'component={Customers}/>
            <PrivateRoute exact path = '/business/report'component={Reports}/>
            



          </div>
            
        
      </Switch>
    </Router>
    
  ); 
}

export default App;
