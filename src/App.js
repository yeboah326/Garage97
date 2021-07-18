import SplashPage from './components/Login_Registration/splashPage'
import Stocks from './components/Stocks'
import Stocks1 from './components/stocks1'
import AddStocks from './components/addStocks'
import LoginForm from './components/Login_Registration/LoginForm'
import RegistrationForm from './components/Login_Registration/RegistrationForm'
import {BrowserRouter as Router,Switch, Route, Redirect} from 'react-router-dom'
import BusinessesDashboard from './components/BusinessesDashboard/BusinessesDashboard'
import BusinessPage from './components/BusinessesDashboard/BusinessPage'
import ProductsPage from './components/ProductDashboard/ProductsPage'
import {useAuth} from './auth/index'




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
            <Route exact path = '/stocks1'component={Stocks1}/>
            <Route exact path = '/stocks'component={Stocks}/>
            <Route exact path = '/addstocks'component={AddStocks}/>



            <Route exact path = '/register' component={RegistrationForm}/>
            <PrivateRoute exact path = '/dashboard-home' component={BusinessesDashboard}/> 
            <PrivateRoute exact  path = '/dashboard-businesses' component={BusinessPage}/>
            <PrivateRoute exact path='/products' component={ProductsPage}/>
          </div>
            
        
      </Switch>
    </Router>
    
  );
}

export default App;
