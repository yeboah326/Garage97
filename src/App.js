import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";
import RegistrationForm from "./components/RegistrationForm";
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <div className="container">
            <Logo className="logo"/>
            <Route exact path = '/login'component={LoginForm}/>
            <Route exact path = '/register' component={RegistrationForm}/>
            
        </div>
      </Switch>
    </Router>
  );
}

export default App;
