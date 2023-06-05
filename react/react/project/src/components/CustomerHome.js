import {Link, Outlet} from 'react-router-dom';
import {Container , DropdownButton, Dropdown} from 'react-bootstrap';
import {useState, useImperativeHandle} from 'react';
 
function CustomerHome()
{
  const [flag,changeFlag]=useState(false);
  const [Data,setData]=useState([]);
  const [message,setMessage]=useState("");
  const [f,changeF]=useState(false);


  const handlecurrnt=(e)=>{
    fetch("http://localhost:8080/services?category="+e)
    .then(resp=>{
        if(resp.ok)
            return resp.text();
        else
            throw new Error("Server error");
    })
    .then(text=>text.length ? JSON.parse(text):{})
    .then(obj=>{
        if(Object.keys(obj).length===0)
        {
           setMessage("No Services Available");
        }
        else{

            setData(obj);
            changeFlag(true);  
        }
    })
    .catch((error)=>{alert("Server error, try after some time")});
    if(flag)
    {
      changeFlag(false);
    }
    else 
      changeFlag(true);
  }

    return(
        <div className="App">
        <div> 
        <nav  className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <ul className="nav navbar me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="services" className="navbar-brand">Services</Link>
              </li>
              <li className="nav-item">
                <Link to="mybooking" className="navbar-brand">Mybookings</Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="navbar-brand">Logout</Link>
              </li> 
            </ul>
          </div>
        </nav>
        <table style={{display:flag?"block":"none"}}>
        <thead>
            <tr>
                <th  width="200" hight="400">Sp_Id</th>
                <th  width="200" hight="400">Name</th>
                <th  width="200" hight="400">Description</th>
                <th  width="200" hight="400">Duration</th>
                <th  width="200" hight="400">Cost</th>
                <th  width="200" hight="400">Sp_Name</th>
               
            </tr>
        </thead>
        <tbody>
        {
            Data.map(s => {return <tr>
                <td>{s.s_id}</td>
                <td>{s.s_name}</td>
                <td>{s.description}</td>
                <td>{s.duration}</td>
                <td>{s.cost}</td>
                <td>{s.sp_id.name}</td>
            </tr>})
        }
        </tbody>
        </table>
        </div>
        <Outlet />
        </div> 
    )
}
export default CustomerHome;