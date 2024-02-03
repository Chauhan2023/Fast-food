import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state, action) => {
 switch(action.type){
    case "ADD": return [...state,{id:action.id,name:action.name,qnty:action.qnty,price:action.price,img:action.img,size:action.size}]
    case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;


    case "UPDATE":
      let arr=[...state]
      arr.find((food,index)=>{
        if (food.id==action) {
          arr[index]={...food,qnty:parseInt(action.qnty)+food.qnty,price:action.price+food.price}
        }

        return arr;
      })


      case "DROP":
        let empArray=[]
        return empArray;



    default:console.log("Error in reducer")
 }
};

export const CartProvider = ({ children }) => {
 const [state, dispatch] = useReducer(reducer, []);
 return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
 );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);