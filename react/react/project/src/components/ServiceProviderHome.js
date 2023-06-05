import {Link,Outlet} from 'react-router-dom';
function ServiceProviderHome()
{

    
     
    return(
        <div className="App">
        <div> 
        <nav  className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <ul className="nav navbar me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/serviceprovider_home/myservice" className="navbar-brand">MyServices</Link>
              </li>
              <li className="nav-item">
                <Link to="/serviceprovider_home/addservice" className="navbar-brand">Add Services</Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="navbar-brand">Logout</Link>
              </li>
              <li className="nav-item">
              <Link to="/serviceprovider_home/paymentacceptance" className="navbar-brand">Paymentacceptance</Link>
            </li> 
            </ul>
          </div>
        </nav>
        </div>
        <Outlet />
        </div>
         
   )
}
export default ServiceProviderHome;