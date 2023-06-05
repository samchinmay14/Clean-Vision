import React from 'react';
import  { useRef,useState,useReducer } from 'react'
import { useNavigate} from 'react-router-dom';

import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
 

export default function Delivery() {


  const navigate=useNavigate();
  const [message,setMessage]=useState("");
  
  let state = useRef();


  const init={
    first_name:"",
    last_name:"",
    zip:"",
    address:"",
    email:"",
    date:""

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

const [delivery_info,dispatch]=useReducer(reducer,init);


  const delivery=(e)=>{
    e.preventDefault();
    if(delivery_info.first_name== "" || delivery_info.last_name== "" || delivery_info.zip== "" || delivery_info.address=="" || delivery_info.email=="" || delivery_info.date=="")
    {
      setMessage("Fill All Fields");
    }
    else{
      localStorage.setItem("deliverydate",delivery_info.date);
      navigate("/customer_home/paymentgateway");
    }
  }

  return (
    <>
      <div className="mx-auto gradient-custom mt-5" style={{ maxWidth: '800px', height: '400px' }}>
        <MDBRow className="pt-3 mx-3">
          <MDBCol md="3">
            <div className="text-center" style={{ marginTop: '50px', marginLeft: '10px' }}>
              <MDBIcon fas icon="shipping-fast text-white" size="3x" />
              <MDBTypography tag="h3" className="text-white">Welcome</MDBTypography>
            
            </div>
            
          </MDBCol>
          <MDBCol md="9" className="justify-content-center">
            <MDBCard className="card-custom pb-4">
              <MDBCardBody className="mt-0 mx-5">
                <div className="text-center mb-3 pb-2 mt-3">
                  <MDBTypography tag="h4" style={{ color: '#495057' }} >Delivery Details</MDBTypography>
                </div>

                <form className="mb-0">
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput label='First name' type='text' name="first_name"  value={delivery_info.first_name} onChange={(e)=>{dispatch({type:"update",field:"first_name",val:e.target.value})}} required/>
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='Last name' type='text'  name="last_name" value={delivery_info.last_name} onChange={(e)=>{dispatch({type:"update",field:"last_name",val:e.target.value})}} required/>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
      <select id="inputState" class="form-select" ref={state} required>
      <option>City</option>
              <option ref={state} value="AN">Pune</option>
    </select>
     
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='Zip' type='text'  name="zip" value={delivery_info.zip} onChange={(e)=>{dispatch({type:"update",field:"zip",val:e.target.value})}} required/>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput label='Address' type='text' name="address" value={delivery_info.address} onChange={(e)=>{dispatch({type:"update",field:"address",val:e.target.value})}}  required/>
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='Email' type='text' name="email" value={delivery_info.email} onChange={(e)=>{dispatch({type:"update",field:"email",val:e.target.value})}} required/>
                    </MDBCol>
                  </MDBRow>
                  <div className="mb-3">
                            <label htmlFor="date" className="form-label">Select Date : </label>
                            <input type="date" name="date" id="date" className="form-control"  required value={delivery_info.date} onChange={(e)=>{dispatch({type:"update",field:"date",val:e.target.value})}} />

                        </div>

                  <div className="float-end">
                   {/* <input type="submit" rounded style={{backgroundColor: '#0062CC'}} onClick={(e)=>{pay(e)}}/>*/}
                    <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{delivery(e)}}>Submit</button>
                    <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:"reset"} )}}>Reset</button>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <p style={{color: "red"}}>{message}</p>
      </div>
    </>
  );
}