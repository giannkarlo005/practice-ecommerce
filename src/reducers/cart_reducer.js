import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  // ADD_TO_CART
  if(action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color)

    if(!tempItem) {
      const newItem = {
        id: id + color,
        name: product.name,
        color: color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      };
      return {
        ...state,
        cart: [
          ...state.cart,
          newItem
        ]
      }
    }

    const tempCart = state.cart.map((item) => {
      if(item.id !== id + color) {
        return item;
      }
      let newAmount = item.amount + amount;
      if(newAmount > item.max) {
        newAmount = item.max;
      }
      return {
        ...item,
        amount: newAmount
      }
    });

    return {
      ...state,
      cart: tempCart
    }
  }
  
  // CLEAR_CART
  if(action.type === CLEAR_CART) {
    return {
      ...state,
      cart: []
    }
  }

  // REMOVE_CART_ITEM
  if(action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);

    return {
      ...state,
      cart: tempCart
    }
  }

  // TOGGLE_CART_ITEM_AMOUNT
  if(action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if(item.id !== id) {
        return item;
      }
      if(value === 'inc') {
        let newAmount = item.amount + 1;
        if(newAmount > item.max) {
          newAmount = item.max;
        }
        return {
          ...item,
          amount: newAmount
        }
      }
      if(value === 'dec') {
        let newAmount = item.amount - 1;
        if(newAmount <= 1) {
          newAmount = 1
        }
        return {
          ...item,
          amount: newAmount
        }
      }
    });

    return {
      ...state,
      cart: tempCart
    }
  }

  // COUNT_CART_TOTALS
  if(action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem;
      total.totalItems += amount;
      total.totalAmount += price * amount;

      return total;
    }, {
      totalItems: 0,
      totalAmount: 0
    })

    return {
      ...state,
      totalItems,
      totalAmount
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
