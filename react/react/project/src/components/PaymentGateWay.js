import React, { startTransition, useEffect, useState, useReducer } from "react";
import { useNavigate} from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

export default function PaymentGateWay() {


  const [message,setMessage]=useState("");
  const [c_id,setCustomerId]=useState({})
  const [o_id,setOrderId]=useState(0);
  const [Amount,setAmount]=useState("");
  const [total,setTotal]=useState(0);
  const [sp_id,setSpId]=useState({});
  const [services,setServices]=useState([]);
  const navigate=useNavigate();


useEffect(()=>{
    var amount=localStorage.getItem("total"); 
    amount=amount+" Rs."
    setAmount(amount)
    setServices(JSON.parse(localStorage.getItem("cart")))
    
    setTotal(localStorage.getItem("total"));

    fetch("http://localhost:8080/getcustomer?login_id="+localStorage.getItem("login_id"))
        .then(resp=>{
            if(resp.ok)
            {
            console.log("ok")
                return resp.text();
            }
            else
                throw new Error("Server error");
        })
        .then(text=>text.length ? JSON.parse(text):{})
        .then(obj=>{
            if(Object.keys(obj).length===0)
            {
               setMessage("No Customer Available");
            }
            else{
                
              setCustomerId(obj)
            }
        })
        .catch((error)=>{alert("Server error, try after some time")});

        


     
},[])
 

const init={
  card_number:"",
  card_holder_name:"",
  expiration:"",
  cvv:""
   

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

const [pay_info,dispatch]=useReducer(reducer,init);

const pay=(e)=>{
  var c;
  e.preventDefault();
  if(pay_info.card_number== "" || pay_info.card_holder_name== "" || pay_info.expiration== "" || pay_info.cvv=="")
  {
    setMessage("Fill All Fields");
  }
  else{
    if(window.confirm("Confierm Payment"))
    {
       

        
        var delivery_date=localStorage.getItem("deliverydate");
       

        
        c=localStorage.getItem("customer_id");
        
        
          
        const reqOption={
          method:"post",
          headers:{'content-type':'application/json'},
          body:JSON.stringify({c_id:c_id,delivery_date:""+delivery_date,list:services,charges:total,sp_id:services[0].sp_id })
        }
        fetch("http://localhost:8080/insertorder",reqOption)
        .then(resp=>{
            if(resp.ok){
              console.log(2);
                return resp.text();
            }
            else
              throw new Error("Server error");
        })
        .then(text=>text.length ? JSON.parse(text):{})
        .then(obj=>{ 
          if(Object.keys(obj).length===0)
          {
             setMessage("No Order Availaible");
          }
          else{

            alert("Order palced Successfully");
            localStorage.removeItem("cart")
            navigate("/customer_home");

          }
      })
      .catch((error)=>{alert("Server error, try after some time")});
      

       
       
    }
  }
}


  return (
      <div id="centre">
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <MDBRow className="d-flex align-items-center">
                <MDBCol size="9">
                  <MDBInput
                    label="Card Number"
                    id="form1"
                    name="card_number"
                    type="text"
                    placeholder="1234 5678 9012 3457"
                    value={pay_info.card_number} 
                    onChange={(e)=>{dispatch({type:"update",field:"card_number",val:e.target.value})}}
                  />
                </MDBCol>
                <MDBCol size="3">
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="visa"
                    width="64px"
                  />
                </MDBCol>

                <MDBCol size="9">
                  <MDBInput
                    label="Cardholder's Name"
                    id="form2"
                    name="card_holder_name"
                    type="text"
                    onChange={(e)=>{dispatch({type:"update",field:"card_holder_name",val:e.target.value})}}
                    value={pay_info.card_holder_name} 
                    placeholder="Cardholder's Name"
                  />
                </MDBCol>

                <MDBCol size="6">
                  <MDBInput
                    label="Expiration"
                    name="expiration"
                    id="form2"
                    type="text"
                    value={pay_info.expiration} 
                    onChange={(e)=>{dispatch({type:"update",field:"expiration",val:e.target.value})}}
                    placeholder="MM/YYYY"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    label="CVV"
                    name="cvv"
                    id="form2"
                    type="text"
                    value={pay_info.cvv} 
                    onChange={(e)=>{dispatch({type:"update",field:"cvv",val:e.target.value})}}
                    placeholder="&#9679;&#9679;&#9679;"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBBtn color="info" rounded size="lg">
                    <MDBIcon fas icon="arrow-right" />
                  </MDBBtn>
                </MDBCol>
                <input type="text" size="3"  rounded size="lg" value={Amount}  />
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      
    </MDBContainer>
    <input class="btn btn-primary m-3" type="submit" value="Submit" onClick={(e)=>{pay(e)}}></input>
    <input class="btn btn-primary m-3" type="submit" value="Reset" onClick={()=>{dispatch({type:"reset"} )}}></input>
    <p style={{color: "red"}}>{message}</p>
  
   
    </div>
  );
}