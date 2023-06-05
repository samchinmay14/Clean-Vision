import { useReducer, useEffect,useState } from "react";
import {useNavigate} from "react-router-dom";


export default function ServiceProviderRegistration() {

    const navigate=useNavigate();

    useEffect(()=>{
        fetch("http://localhost:8080/getAllLogins")
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
               console.log("No Login data");
            }
            else{
                console.log("Login data");
                setData(obj);
            }
            
            
            
        })
        .catch((error)=>{alert("Server error, try after some time")});
},[])

    const init = {
       
        name: {value:"", hasError: true,touched: false, error:""},
        email: {value:"", hasError: true,touched: false, error:""},
        contact: {value:"", hasError: true,touched: false, error:""},
        password: {value:"", hasError: true,touched: false, error:""},
        address: {value:"", hasError: true,touched: false, error:""}
         
    }

    const reducer = (state,action) => {
        
        switch(action.type){
            case 'update' : {
                const {name,value,hasError, error, touched, isFormValid} = action.data;
                return { 
                    ...state,
                    [name]: { ...state[name],value, hasError, error, touched},
                    isFormValid
                }   
            }
            case 'reset' : {
                return init;
            }
        }
    }


    const handleChange = (name,value) => {
          const {hasError, error}= validate(name,value);
          checContact("");
          checkMail("");
          setFilled(false)
          let isFormValid = true;
          
          for(let key in state)  
          {
             if(state[key].hasError === true)
             {
                 isFormValid = false;
                 break;   
             }
          } 
          
          dispatch({type:'update',data:{name,value,hasError,error, touched:true,isFormValid}})
    }


    const validate = (name,value) => {
        let hasError=false;
        let error="";
        switch(name)
        {
             
            case 'name':
                var re1 = /^[A-Za-z\s]+$/;
                if(!re1.test(value))
                {
                    hasError = true;
                    error = "Invalid Name";
                }
                break;
            case 'email':
                var re3 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re3.test(value))
                {
                    hasError = true;
                    error = "Invalid Email";
                }
                break;

            case 'contact':
                var re4 = /^[1-9][0-9]{9}$/;
                if(!re4.test(value))
                {
                    hasError = true;
                    error = "Invalid Mobile no";
                }
                break;

            case 'password':
                var re5 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/;
                if(!re5.test(value))
                {
                    hasError = true;
                    error = "Invalid Password";
                }
                break;
         
        }
        return {hasError, error}
    }
    const sendData=(e)=>{
        e.preventDefault();
        if(state.name.value=="" || state.email.value=="" || state.contact.value=="" || state.password.value == ""|| state.address.value=="")
            setFilled(true)
        else
        {
        const reqOption={
            method:"post",
            headers:{'content-type':'application/json'},
            body:JSON.stringify({name:state.name.value,email:state.email.value,contact:state.contact.value,password:state.password.value,address:state.address.value})
        }
        fetch("http://localhost:8080/regserviceprovider",reqOption )
        .then(resp=>{
            if(resp.ok)
                return resp.text();
            else
                throw new Error("Server error");
        })
        .catch((error)=>{alert("Server error, try after some time")});
        navigate("/login");
    }

    }

    const handleBlur=(event)=>{
      

        var hasmail=Data.some(i=>i.email == event);
        console.log(hasmail);
        if(hasmail)
        {
            let err=true;
            checkMail(err);
            console.log("err");
        }
        else{
            let err=false;
            checkMail(err);
        }
         
    }

    const handleContact=(event)=>{
      

        var hasmail=Data.some(i=>i.contact == event);
        if(hasmail)
        {
            let err=true;
            checContact(err);
            console.log("err");
        }
        else{
            let err=false;
            checContact(err);
        }
         
    }
    const [emailstate,checkMail]=useState(false);
    const [Filled,setFilled]=useState(false);
    const [contactstate,checContact]=useState(false);
    const [Data,setData]=useState([]);


    const [state,dispatch] = useReducer(reducer,init);
    const [message,setMessage]=useState("");

    return (<div className="container w-50" id="centre">
        
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label h4">Name : </label>
                    <input type="text" name="name" className="form-control" id="name" value={state.name.value} onChange={(e)=>{handleChange("name",e.target.value)}} />
                    <p style={{display: state.name.touched && state.name.hasError ?"block":"none",color: "red"}}> {state.name.error} </p>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label h4">Email Id : </label>
                    <input type="text" name="email" className="form-control" id="email" value={state.email.value}  onBlur={(e)=>handleBlur(e.target.value)} 
                    onChange={(e)=>{handleChange("email",e.target.value)}} />
                    <p style={{display: state.name.touched && state.email.hasError ?"block":"none",color: "red"}}> {state.email.error} </p>
                    <p style={{display: emailstate ?"block":"none",color: "red"}}> Email Already exists </p>
                     
            </div>

             

            <div className="mb-3">
                <label htmlFor="contact" className="form-label h4">Contact No. : </label>
                    <input type="text" name="contact" className="form-control" id="contact" value={state.contact.value} onBlur={(e)=>handleContact(e.target.value)} onChange={(e)=>{handleChange("contact",e.target.value)}} />
                    <p style={{display: state.contact.touched && state.contact.hasError ?"block":"none",color: "red"}}> {state.contact.error} </p>
                    <p style={{display: contactstate ?"block":"none",color: "red"}}> Contact Already exists </p>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label h4">Password. : </label>
                    <input type="password" name="password" className="form-control" id="password" value={state.password.value} onChange={(e)=>{handleChange("password",e.target.value)}} />
                    <p style={{display: state.password.touched && state.password.hasError ?"block":"none",color: "red"}}> {state.password.error} </p>
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label h4">Address. : </label>
                    <input type="text" name="address" className="form-control" id="address" value={state.address.value} onChange={(e)=>{handleChange("address",e.target.value)}} />
                    <p style={{display: state.address.touched && state.address.hasError ?"block":"none",color: "red"}}> {state.address.error} </p>
            </div>

            <div className="col-12">
                        <button type="submit" className="btn btn-primary m-3" onClick={(e)=>{sendData(e)}}>Submit</button>
                        <button type="reset" className="btn btn-primary m-3" onClick={()=>{dispatch({type:"reset"} )}}>Reset</button>
                        <p style={{display:  Filled ?"block":"none",color: "red"}}> All Filled Complusory </p>
            </div>
     
            
        </form>
    </div>)
}