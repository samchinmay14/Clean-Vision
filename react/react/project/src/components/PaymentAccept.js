import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
export default function PaymentAccept(){

    const navigate = useNavigate();
    const [Data,setData]=useState([]);
    const [D,setD]=useState([]);
 
    useEffect(()=>{
            
        var u;
        u=JSON.parse(localStorage.getItem("login_id")); 
        fetch("http://localhost:8080/serviceproviderByLogin_id?login_id="+u)
        .then(resp=>{
            if(resp.ok)
            {
                 
                return resp.text();
            }
            else
                throw new Error("Server error");
        })
        .then(text=>text.length ? JSON.parse(text):{})
            .then(obj=>{
                if(Object.keys(obj).length===0)
                {
                    
                   setData([]);
                   setMessage("No ServiceProvider Available");
                }
                else{
                    fetch("http://localhost:8080/getSpPayments?sp_id="+obj.sp_id)
                    .then(resp=>{
                    if(resp.ok)
                    {
                        
                        return resp.json();
                    }
                    else{
                        throw new Error("Server error");
                        }
                    })
                    .then(obj=>{
                        setData(obj)
                    })
                        
                }
                
    
            })
            .catch((error)=>{alert("Server error, try after some time")});
           console.log("Yess")
            
           
         
     },[D])
 
     
     const sendData=(e)=>{
        
         fetch("http://localhost:8080/paymentreceived?p_id="+e)
         .then(resp=>{
             if(resp.ok){
                setD([]);
                 return resp.json();
                 
             }
             else
                 throw new Error("Server error");
         }).catch((error)=>{alert("Server error, try after some time 2")});
       }
 
      
     const [message,setMessage]=useState("");
 
     return(<div>
        <table  className="table">
        <thead>
            <tr>
                <th className="td"  width="200" hight="400">First Name</th>
                <th className="td"  width="200" hight="400">Last Name</th>
                <th  className="td" width="200" hight="400">Amount</th>
                <th  className="td" width="200" hight="400">Payment Status</th>
            </tr>
        </thead>
            {
                Data.map((s) => {return <tr>
                    <td className="td" >{s.c_id.f_name}</td>
                    <td className="td" >{s.c_id.l_name}</td>
                    <td className="td" >{s.charges}</td>  
                    <td className="td" ><button onClick={()=>{sendData(s.p_id)}}>Confirm</button></td>
                </tr>})
            }
       
        </table>
             
            
     </div>
     )
        
}