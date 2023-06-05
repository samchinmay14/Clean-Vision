import {useEffect,useState} from 'react';

export default function BookedServices()
{
    const [Data,setData]=useState([]);
    const [message,setMessage]=useState("");
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
                    fetch("http://localhost:8080/getorderbyspid?sp_id="+obj.sp_id)
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
                        setD(obj)
                    })
                        
                }
                
    
            })
            .catch((error)=>{alert("Server error, try after some time")});
           console.log("Yess")
            
    },[])


    const sendData=(e)=>{
        
        fetch("http://localhost:8080/ordercompleted?oi_id="+e)
        .then(resp=>{
            if(resp.ok){
               setD([]);
                return resp.json();
                
            }
            else
                throw new Error("Server error");
        }).catch((error)=>{alert("Order Accepted")});
    }
  

    return(<div>
        <table striped bordered hover variant='dark'>
        <thead>
            <tr>
                <th  width="200" hight="400">Order Number</th>
                <th  width="200" hight="400">First Name</th>
                <th  width="200" hight="400">Last Name</th>
                <th  width="200" hight="400">Contact</th>
                <th  width="200" hight="400">Service</th>
                <th  width="200" hight="400">Order Date</th>
                <th  width="200" hight="400">Delivery Date</th>
                <th  width="200" hight="400">Status</th>
            </tr>
        </thead>
        <tbody>
        {
            D.map(o => {return <tr>
                <td>{o.oi_id}</td>
                <td>{o.o_id.c_id.f_name}</td>
                <td>{o.o_id.c_id.l_name}</td>
                <td>{o.o_id.c_id.login.contact}</td>
                <td>{o.s_id.s_name}</td>
                <td>{o.o_id.order_date}</td>
                <td>{o.o_id.delivery_date}</td>
                <td><button onClick={()=>{sendData(o.oi_id)}}>Completed</button></td>

            </tr>})
        }
        </tbody>
        </table>
        <h1 style={{color: "red"}}>{message}</h1>
    </div>)
}