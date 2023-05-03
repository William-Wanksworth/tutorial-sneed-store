import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalCart = () => {
  const item = localStorage.getItem("cart");
  const parsed = JSON.parse(localStorage.getItem("cart"));

  return item ? parsed : [];
};

const initialState = {
  cart: getLocalCart(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  const increaseAmount = (id, color) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: { operation: "increase", id, color },
    });
  };

  const decreaseAmount = (id, color) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: { operation: "decrease", id, color },
    });
  };

  const removeItem = (id, color) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id, color } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        increaseAmount,
        decreaseAmount,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
