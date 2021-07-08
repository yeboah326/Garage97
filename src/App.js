import Logo from './components/Logo'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import BusinessesDashboard from './components/BusinessesDashboard/BusinessesDashboard'
import BusinessPage from './components/BusinessesDashboard/BusinessPage'
import ProductsPage from './components/ProductDashboard/ProductsPage'
function App() {
  return (
    <Router>
      <Switch>
     
          <div className='container'>
            <Route exact path = '/' component={Logo}/>
            <Route exact path = '/login'component={LoginForm}/>
            <Route exact path = '/register' component={RegistrationForm}/>
            <Route exact path = '/dashboard-home' component={BusinessesDashboard}/> 
            <Route exact  path = '/dashboard-businesses' component={BusinessPage}/>
            <Route exact path='/products' component={ProductsPage}/>
          </div>
            
        
      </Switch>
    </Router>
    
  );
}

export default App;
