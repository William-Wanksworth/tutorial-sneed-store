import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, color, product } = action.payload;
    const tempItem = state.cart.find((p) => p.id === id && p.color === color);
    if (tempItem) {
      let newAmount;
      const tempCart = state.cart.map((prod) => {
        if (prod.id === tempItem.id && prod.color === tempItem.color) {
          if (prod.amount + amount <= prod.max_amount) {
            newAmount = prod.amount + amount;
          } else {
            newAmount = prod.max_amount;
          }

          return {
            ...prod,
            amount: newAmount,
          };
        }
        return prod;
      });

      return {
        ...state,
        cart: tempCart,
      };
    }
    const newItem = {
      id,
      color,
      name: product.name,
      amount,
      image: product.images[0].url,
      price: product.price,
      max_amount: product.stock,
    };
    return {
      ...state,
      cart: [...state.cart, newItem],
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const newTotalAmount = state.cart.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    const newTotalItems = state.cart.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    return {
      ...state,
      total_amount: newTotalAmount,
      total_items: newTotalItems,
    };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, color, operation } = action.payload;
    const tempItem = state.cart.find((p) => p.id === id && p.color === color);

    const tempCart = state.cart.map((prod) => {
      if (prod.id === tempItem.id && prod.color === tempItem.color) {
        let newAmount;
        if (operation === "increase") {
          newAmount =
            prod.amount < prod.max_amount ? prod.amount + 1 : prod.amount;
        } else newAmount = prod.amount > 1 ? prod.amount - 1 : prod.amount;
        return {
          ...prod,
          amount: newAmount,
        };
      }
      return prod;
    });
    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === REMOVE_CART_ITEM) {
    const { id, color } = action.payload;
    const tempItem = state.cart.find((p) => p.id === id && p.color === color);
    const tempCart = state.cart.filter((prod) => {
      if (prod.id === tempItem.id && prod.color === tempItem.color) {
        return false;
      } else return true;
    });
    console.log(tempCart);
    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
