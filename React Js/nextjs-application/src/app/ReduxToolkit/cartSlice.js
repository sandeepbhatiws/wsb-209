import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

var getCartData = Cookies.get('cartItems');
var getCartData = getCartData ? JSON.parse(getCartData) : [];

const initialState = {
  cartItems: getCartData ?? [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

      var checkCart = state.cartItems.filter((v) => {
        if(v.id == action.payload.id){
          return v;
        }
      });

      if(checkCart.length == 0){
        const cartData = {
          id : action.payload.id,
          name : action.payload.name,
          description : action.payload.description,
          image : action.payload.image,
          price : action.payload.price,
          quantity : 1
        }

        const finalData = [cartData, ...state.cartItems];
        state.cartItems = finalData;
        toast.success('Add to Cart')
        Cookies.set('cartItems', JSON.stringify(finalData));
      } else {


        var cartUpdate = state.cartItems.map((v) => {
          if(v.id == action.payload.id){
            v.quantity++;
            return v;
          } else {
            return v;
          }
        })


        const finalData = [...cartUpdate];
        state.cartItems = finalData;
        toast.success('Update to Cart')
        Cookies.set('cartItems', JSON.stringify(finalData));

      }

      
    },
    deleteCart: () => {
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer