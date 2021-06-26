import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";
import RegistrationForm from "./components/RegistrationForm";
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import SideNavBar from "./components/BusinessesDashboard/SideNavBar";
import Businesses from "./components/BusinessesDashboard/Businesses";
import AddButton from "./components/BusinessesDashboard/AddButton";
import BusinessesDashboard from './components/BusinessesDashboard/BusinessesDashboard'


function App() {
  return (
    <Router>
      <Switch>
        <div className="container-login">
            {/* <Logo className="logo"/>
            <Route exact path = '/login'component={LoginForm}/>
            <Route exact path = '/register' component={RegistrationForm}/> */}
            <BusinessesDashboard/>
        </div>
      </Switch>
    </Router>
    
  );
}

export default App;
