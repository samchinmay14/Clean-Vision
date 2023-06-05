import { useReducer, useState  } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {login} from '../redux/slice';
 

function Login()
{
    const reduxDispatch = useDispatch();
     
    const [message,setMessage]=useState("");
    const navigate=useNavigate();
    const init={
        uid:"",
        password:""
    }
    const reducer=(state,action)=>{
        setMessage("");
        switch(action.type)
        {
            case "update":
                return {...state,[action.field]:action.val}
            case "reset":
                setMessage("");
                return init
        }
    }

    const [login_info,dispatch]=useReducer(reducer,init);
    const sendData=(e)=>{
        e.preventDefault();
        const reqOption={
            method:"post",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(login_info)
        }
        fetch("http://localhost:8080/checkLogin",reqOption)
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
               setMessage("Wrong uid/password");
             
            }
            else{
                if(obj.status=== false)
                {
                    alert("Request has not been approved");
                }
                else
                {
                    var arr=Object.values(obj);
                    localStorage.setItem("customer_address",arr[4])
                    console.log(arr[0]);
                    localStorage.setItem("login_id",arr[0])
                     
                    reduxDispatch(login());
                    if(obj.role_id.role_id === 1)
                    {
                        localStorage.setItem("role","customer");
                        
                        navigate("/customer_home");
                    }
                    else if(obj.role_id.role_id === 2)
                    {
                        localStorage.setItem("role","service_provider");
                         
                        navigate("/serviceprovider_home");
                    }
                    else if(obj.role_id.role_id === 3)
                    {
                        localStorage.setItem("role","admin");
                    
                        navigate("/admin_home");
                    }
                }
            }

        })
        .catch((error)=>{alert("Server error, try after some time")});
    }

    
   

    return(
        <div className="w-50" id="centre">
            <div className="container">
                <h1 className="head"> Login </h1>
                <div className="row">
                <div className="column" >
                <form className="form">
                    <div className="mb-3">
                        <label htmlFor="uid" className="form-label h4">Enter uid : </label>
                        <input type="text" name="uid" id="uid" className="form-control"  required value={login_info.uid} onChange={(e)=>{dispatch({type:"update",field:"uid",val:e.target.value})}} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label h4">Enter password : </label>
                        <input type="password" name="pd" id="pwd" className="form-control" required value={login_info.password} onChange={(e)=>{dispatch({type:"update",field:"password",val:e.target.value} )}}/>
                    </div>
                     
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary m-3" onClick={(e)=>{sendData(e)}}>Login</button>
                        <button type="reset" className="btn btn-primary m-3" onClick={()=>{dispatch({type:"reset"} )}}>Reset</button>
                    </div>
                </form>                    
            </div>
        </div>
    { /*<p>{JSON.stringify(login_info)}</p> */}
    <p style={{color: "red"}}>{message}</p>
    </div>  
    </div>  
     )
}
export default Login;