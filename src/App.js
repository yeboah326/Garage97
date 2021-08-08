import SplashPage from './components/Login_Registration/splashPage'
// import Stocks from './components/Stocks'
import StockPage from './components/StocksPage/stocks1'
// import AddStocks from './components/addStocks'
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
import SalesListPage from './components/salesPage/sales'
import StockListPage from './components/StocksPage/stockList'




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
            <Route exact path = '/home' component={SplashPage}/>
            <Redirect from = '/' to='/home'/> 
            <Route exact path = '/login'component={LoginForm}/>
            <Route exact path = '/sales'component={SalesListPage}/>
            <Route exact path = '/addstocks'component={AddStocks}/>
            <Route exact path = '/addsales'component={AddSales}/>
            <Route exact path = '/stocks1'component={StockPage}/>
            <Route exact path = '/stockList'component={StockListPage}/>
            {/* <Route exact path = '/addstocks'component={AddStocks}/> */}



            <Route exact path = '/register' component={RegistrationForm}/>
            {/* <PrivateRoute exact path = '/home' component={BusinessesDashboard}/>  */}
            <PrivateRoute exact  path = '/businesses' component={BusinessPage}/>
            <PrivateRoute path='/business/products' component={ProductsPage}/>
            <PrivateRoute path='/business/overview' component={Overview}/>
          </div>
            
        
      </Switch>
    </Router>
    
  ); 
}

export default App;
