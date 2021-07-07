import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import SplashPage from "./components/splashPage";


function App() {
 
  return (
    <Router>
      <Switch>
        <div className="container">
          
          <Route exact path = '/' component={SplashPage}/> 
          <Route exact path = '/login'component={LoginForm}/>
            <Route exact path = '/register' component={RegistrationForm}/>
            
            
        </div>
      </Switch>
    </Router>
  );
}

export default App;
