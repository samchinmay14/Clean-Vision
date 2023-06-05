import { useReducer, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
export default function AddServices(){

    const [Data,setData]=useState([]);
    const [Name,setName]=useState([]);
    const [message,setMessage]=useState("");
    const[flag,setFlag]=useState(false);

    const navigate=useNavigate();
    

    useEffect(()=>{
        fetch("http://localhost:8080/services")
        .then(resp=>{
            if(resp.ok)
                return resp.json()
            else
                throw new Error("Server error");
        })
        .then(obj=>{
            if(Object.keys(obj).length===0)
            {
               
            }
            else{
                 
                setData(obj)
            }
                
        })
        .catch((error)=>{alert("Server error, try after some time")});
    },[])


   

    const init = {
        s_name:"" ,
        description:"" ,
        duration:"",
        cost:0
       
    }


    const sendData=(e)=>{
        e.preventDefault();
        fetch("http://localhost:8080/serviceproviderByLogin_id?login_id="+localStorage.getItem("login_id"))
        .then(resp=>{
            if(resp.ok)
            {
                 
                return resp.json();
            }
            else
                throw new Error("Server error");
        })
        .then(obj=> {
            const reqOption={
                method:"post",
                headers:{'content-type':'application/json'},
                body:JSON.stringify({s_name:state.s_name,description:state.description,duration:state.duration,cost:state.cost,sp_id:obj})
            }
            fetch("http://localhost:8080/insertservice",reqOption )
            .then(resp=>{
                if(resp.ok)
                {   
                    return resp.json();
                }
                else
                    throw new Error("Server error");
            })
            .then(obj=>{
                setFlag(true)
            })
            .catch((error)=>{alert("Server error, try after some time")});
        })
        .catch((error)=>{alert("Server error, try after some time")});
        alert("added")
        navigate("/serviceprovider_home")
    
         
        
        
    }

    
    const reducer = (state,action) => {
        
        switch(action.type){
            case 'update' :  
                return {...state,[action.field]:action.val}
            case 'reset' : {
                return init;
            }
        }
    }

    const [state,dispatch] = useReducer(reducer,init);

    return(
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="s_name" className="form-label">Select Service : </label>
                     <select name="s_name"className="form-control" id="s_name" onChange={(e)=>{dispatch({type:'update',field:'s_name',val:e.target.value})}}>
                    {
                         Data.map((name)=>{
                             return <option value={name.s_name}>{name.s_name}</option>
                         })
                    }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description : </label>
                    <input type="text" name="description"    className="form-control"  id="description"  value={state.description.value}   onChange={(e)=>{dispatch({type:'update',field:'description',val:e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration : </label>
                    <input type="text" name="duration"  className="form-control"  id="duration"  value={state.duration.value}   onChange={(e)=>{dispatch({type:'update',field:'duration',val:e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cost" className="form-label">Cost : </label>
                    <input type="number" name="cost"  className="form-control"  id="cost"  value={state.cost.value}   onChange={(e)=>{dispatch({type:'update',field:'cost',val:e.target.value})}}/>
                </div>
                
                <div className="col-12">
                        <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{sendData(e)}}>Submit</button>
                        <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:"reset"} )}}>Reset</button>
                </div>
                
            </form>
  
          

        </div>
    )
}