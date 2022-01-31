//use of context api
import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const StoreContext = createContext();

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  //here JSON.parse get a string which is converted into javascript object
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return {
        ...state,
        darkMode: true,
      };
    case 'DARK_MODE_OFF':
      return {
        ...state,
        darkMode: false,
      };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      //state.cart.cartItems. is an array from the state above
      const existItem = state.cart.cartItems.find(
        // (item) => item._id === newItem._id , it comparing both id ie from database
        (item) => item._id === newItem._id
      );
      //below cartItems = existItem , means newItem already exist in cartItems so updating its quantity
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }
    default:
      return state;
  }
}
export function StoreProvider(props) {
  // useReducer accept 2 paramenters reducer and initial state
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
