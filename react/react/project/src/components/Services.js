import {useEffect,useState} from 'react';
import { useNavigate, json } from 'react-router-dom'
import BookingCart from './BookingCart';
export default function Services()
{
    const navigate = useNavigate();
    const [Data,setData]=useState([]);
    const [message,setMessage]=useState("");
    const[flag,setFlag]=useState(false);

    

    useEffect(()=>{
        fetch("http://localhost:8080/services")
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
                if(JSON.parse(localStorage.getItem('cart'))!=null)
                    navigate("/customer_home/specific_services");
                else
                     setData(obj);
               
            }
        })
        .catch((error)=>{alert("Server error, try after some time")});
        var role=localStorage.getItem("role");
    if(role=="customer")
        setFlag(true);
},[])
    
    const sendService=(s)=>{
        var mybookings=JSON.parse(localStorage.getItem("cart"));
        var total=localStorage.getItem("total",total);
        
        if(mybookings == null)
            mybookings = [];
        mybookings.push(s);
        localStorage.setItem("cart",JSON.stringify(mybookings)); 
        navigate("/customer_home/mybooking")

    }
   
    return(
        <div  className="container" id="centre">
        <table className="td">
        <thead>
            <tr>
               
                <th className="td"  width="200" hight="400">Name</th>
                <th  className="td" width="200" hight="400">Description</th>
                <th  className="td" width="200" hight="400">Duration</th>
                <th className="td"  width="200" hight="400">Cost</th>
              
               
            </tr>
        </thead>
        <tbody>
        {
            Data.map((s,i) => {return <tr>
             
                <td className="td">{s.s_name}</td>
                <td className="td">{s.description}</td>
                <td className="td">{s.duration}</td>
                <td className="td">{s.cost}</td>
             
                <td className="td" style={{display:flag?"block":"none"}}><button onClick={()=>{sendService(s)}}>Buy</button></td>
              
            </tr>})
        }
        </tbody>
        </table>
    </div>)
}