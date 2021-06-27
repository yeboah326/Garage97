import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";
import RegistrationForm from "./components/RegistrationForm";
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import SideNavBar from "./components/SideNavBar";
import Businesses from "./components/Businesses";
import AddBusiness from "./components/AddBusiness";
import AddProducts from "./components/AddProducts";
import DeleteProduct from "./components/DeleteProduct";
import DeleteBusiness from "./components/DeleteBusiness"
function App() {
  return (
    <Router>
      <Switch>
        <div className="container-add">
            {/* <Logo className="logo"/> */}
            {/* <Route exact path = '/login'component={LoginForm}/> */}
            {/* <Route exact path = '/register' component={RegistrationForm}/> */}
            {/* <SideNavBar/> */}
            {/* <Businesses/> */}
            {/* <AddProducts/> */}
            {/* <DeleteProduct/> */}
            <DeleteBusiness/>
        </div>
      </Switch>
    </Router>
    
  );
}

export default App;
