import logo from './logo.svg';
import './App.css';
import {Link, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import CustomerHome from './components/CustomerHome';
import ServiceProviderHome from './components/ServiceProviderHome';
import AdminHome from './components/AdminHome';
import {useSelector} from 'react-redux';
import Logout from './components/Logout';
import RegistrationForm from './components/CustomerRegistration';
import CustomerRegistration from './components/CustomerRegistration';
import ServiceProviderRegistration from './components/ServiceProviderRegistration';
import Home from './components/Home';
import ServiceProviderRegistrationStatus from './components/ServiceProviderRegistraionStatus';
import Services from './components/Services';
import BookingCart from './components/BookingCart';
import PaymentGateWay from './components/PaymentGateWay';
import MyServices from './components/MyServices';
import AddServices from './components/AddServices';
import Delivery from './components/Delivery';
import SpecificService from './components/SpecificService';
import PaymentAccept from './components/PaymentAccept';
import BookedServices from './components/BookedServices';
 
import cleaningTools from './images/cleaningTools.jpeg';
 
function App() {
  const mystate=useSelector((state)=>{return state.logged})
  return (
    <div className="App has-bg-img">
      <img src={cleaningTools} className="bg-img" id="bgimg"/>
      <div style={{display: mystate.loggedIn? "none":"block"}}> 
      <nav  className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <ul className="nav navbar me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="navbar-brand">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="navbar-brand">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/customer_registration" className="navbar-brand">CustomerRegistration</Link>
            </li>
            <li className="nav-item">
              <Link to="/serviceprovider_registration" className="navbar-brand">ServiceProviderRegistration</Link>
            </li> 
 
          </ul>
        </div>
      </nav>
      </div>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/customer_registration" element={<CustomerRegistration/>} />
        <Route path="/serviceprovider_registration" element={<ServiceProviderRegistration/>} />
        <Route path="/customer_home" element={<CustomerHome/>} >
              <Route path="services" element={<Services/>} />
              <Route path="specific_services" element={<SpecificService/>} />
              <Route path="mybooking" element={<BookingCart/>} />
              <Route path="delivery" element={<Delivery/>} />
              <Route path="paymentgateway" element={<PaymentGateWay/>} />
        </Route>
        <Route path="/serviceprovider_home" element={<ServiceProviderHome/>} >
          <Route path="services" element={<Services/>} />
          <Route path="myservice" element={<MyServices/>} />
          <Route path="addservice" element={<AddServices/>} />
          <Route path="bookedervices" element={<BookedServices/>} />
          <Route path="paymentacceptance" element={<PaymentAccept/>} />
        </Route>
        <Route path="/admin_home" element={<AdminHome/>} >
            <Route path="serviceproviderstatus" element={< ServiceProviderRegistrationStatus/>}/>
            <Route path="services" element={<Services/>} />
        </Route>
      </Routes>
      </div>
    
  )
}

export default App;
