import { useState,useEffect } from "react";
import { useNavigate, json } from 'react-router-dom';
 
export default function BookingCart()
{
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
  
    const [message, setMessage] = useState("")
    const [flag,setFlag]=useState(false);
    const [Data,setData]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
    const items = JSON.parse(localStorage.getItem('cart'));
    
    if (items) {
        
        setItems(items);

        setFlag(true);
    }
    else{
         
        setMessage("Your cart is empty!");
    }
    if(items)
    {
    var t=0;
    for(var i=0;i<items.length;i++)
    {
        t+=items[i].cost;
        
         
    }
    setTotal(t);
    
    
}

    }, [Data]);

     const moreServices=()=>{
        localStorage.setItem("total",total);
        if(JSON.parse(localStorage.getItem('cart'))!=null)
            navigate("/customer_home/specific_services");
        else
            navigate("/customer_home/services");
     }
      
    const placeOrder=()=>{
        localStorage.setItem("total",total);
        if(items.length!=0)
            navigate("/customer_home/delivery");
        else
            alert("Your cart is empty!")
     
    }

     const removeService=(e)=>{
       const mycart=JSON.parse(localStorage.getItem("cart"));
        for(var i=0;i<mycart.length;i++)
        {
            if(mycart[i].s_id == e)
            {
                mycart.splice(i,1);
                localStorage.setItem("total",total);
            }
             
        }
     
        if(mycart.length !=0){
            localStorage.setItem("cart",JSON.stringify(mycart));
            localStorage.setItem("total",total);
            setData(mycart);
        }
        else{
            
            localStorage.removeItem("cart");
            
        }

     }
    return(
    <div  className="container" id="centre">
        <div style={{display:flag?"block":"none"}}> 
        <table  className="td"  id="centre">
            <thead>
                <tr>
                    <th className="td"  width="200" hight="400">Sp_Id</th>
                    <th  className="td" width="200" hight="400">Name</th>
                    <th className="td"  width="200" hight="400">Description</th>
                    <th className="td"  width="200" hight="400">Duration</th>
                    <th  className="td" width="200" hight="400">Cost</th>
                    <th  className="td" width="200" hight="400">Sp_id</th>
               
                </tr>
            </thead>
            <tbody>
            {
                items.map(s => {return <tr>
                    <td className="td">{s.s_id}</td>
                    <td className="td">{s.s_name}</td>
                    <td className="td">{s.description}</td>
                    <td className="td">{s.duration}</td>
                    <td className="td">{s.cost}</td>
                    <td className="td">{s.sp_id.name}</td>
                    <td className="td"><button onClick={()=>{removeService(s.s_id)}}>Remove</button></td>
                    </tr>})
            }
            </tbody>
        </table>
        </div>

        <div style={{display:flag?"none":"block"}}>
            <h3>{message}</h3>
            <p  className="h5">Add items to it now</p>
         </div>
        <button  className="button" style={{color:"red"}} onClick={()=>{moreServices()}}>Buy service</button>
        <button className="button" style={{color:"red"}} onClick={()=>{placeOrder()}}>Place Order</button>
        <h3>Total : {total}</h3>
    </div>
    )
}