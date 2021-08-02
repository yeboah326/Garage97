import SplashPage from './components/Login_Registration/splashPage'
import Stocks1 from './components/StocksPage/stocks1'
import AddStocks from './components/StocksPage/addStocks'
import LoginForm from './components/Login_Registration/LoginForm'
import RegistrationForm from './components/Login_Registration/RegistrationForm'
import {BrowserRouter as Router,Switch, Route, Redirect} from 'react-router-dom'
import BusinessesDashboard from './components/BusinessesDashboard/BusinessesDashboard'
import BusinessPage from './components/BusinessesDashboard/BusinessPage'
import ProductsPage from './components/ProductDashboard/ProductsPage'
import {useAuth} from './auth/index'
import Overview from './components/Overview/Overview'
import About from './components/Login_Registration/about'




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
            { <Route exact path = '/stocks1'component={Stocks1}/> }
            
            { <Route exact path = '/addstocks'component={AddStocks}/> }


            <Route exact path = '/about' component={About}/>

            <Route exact path = '/register' component={RegistrationForm}/>
            <PrivateRoute exact path = '/home' component={BusinessesDashboard}/> 
            <PrivateRoute exact  path = '/businesses' component={BusinessPage}/>
            <PrivateRoute exact path='/products' component={ProductsPage}/>
            <PrivateRoute exact path='/overview' component={Overview}/>
          </div>
            
        
      </Switch>
    </Router>
    
  ); 
}

export default App;
