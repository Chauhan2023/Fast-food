import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatch } from "./ContextReducer";

function Card(props){
        let options=props.options;
        const priceOptions = Object.keys(options);
        let disptach=useDispatch();
        let data=useCart();
        const priceref=useRef();
        const [qnty,setqnty]=useState(1)
        const [size,setsize]=useState("")


        const handeladdtocart=async()=>{

            let food=[];
            for(const item of data){
                if(item.id=== props.fooditem._id){
                    food=item;

                    break;
                }
            }

            if (food.length > 0) {
                if(food.size==size){
                    await disptach({type:"UPDATE", id:props.fooditem._id,price: finalprice,qnty:qnty})
                    return
                }
            
            else if(food.size!==size){
                await disptach({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qnty:qnty,size:size,img:props.fooditem.image});
                return
            }
        return
            }
            await disptach({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qnty:qnty,size:size,img:props.fooditem.image});
        }

        let finalprice = qnty * parseInt(options[size]);
        



    
    useEffect(() => {
        setsize(priceref.current.value)
      }, []);
      




    return(
        <div>
        <div className="card mt-3" style={{width: "18rem", maxHeight:"360px"}}>
    <img src={props.fooditem.image} className="card-img-top imgs" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">{props.fooditem.name}</h5>
      <p className="card-text">{props.fooditem.description}</p>
      <div className="container w-100">
          <select name="" id="" className="m-2 h-100 " style={{background:'#00C03F'}} ref={priceref} onChange={(e)=>{setqnty(e.target.value)}}>
              {
                  Array.from(Array(6),(e,i)=>{
                      return(
                          <option key={i+1} value={i+1}>{i+1}</option>
                      )
                  })
              }
          </select>
  
  
          <select name="" id="" className="m-2 h-100  rounded" ref={priceref} style={{background:'#00C03F'}} onChange={(e) => setsize(e.target.value)} >
          {priceOptions.map((data,index)=>{
            return<option key={index} value={data}>{data}</option>
          })}
          </select>

          <div className="d-inline fw-bold h-100 fs-5">
              ₹{finalprice}/-
          </div>
  
      </div>
      <hr />
      <button className="btn justify-center ms-2 text-white" style={{background:'#00C03F'}} onClick={handeladdtocart}>Add Cart</button>
    </div>
  </div>
  </div>
    )
}

export default Card;

