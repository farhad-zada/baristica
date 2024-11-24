import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageHead: "",
  lang: "az",
  profileActiveTab: "personalData",
  token: true,
  cart: [],
  finalCart: [1,2,3]
};

const baristicaSlice = createSlice({
  name: "baristica",
  initialState,
  reducers: {
    setPageHead: (state, action) => {
      state.pageHead = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setProfileActiveTab: (state, action) => {
      state.profileActiveTab = action.payload
    },
    addProductToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.cartCount += product.cartCount
      } else {
        state.cart.push(product);
      }
    },
    deleteFromCart: (state, action) => {
      const id = action.payload
      state.cart = state.cart.filter((product) => product.id !== id)
    },
    setFinalCart: (state, action) => {
      const {product, checked} = action.payload
      if(checked){
        state.finalCart.push(product)
      } else{
        state.finalCart = state.finalCart.filter((el) => el.id !== product.id)
      }
    }
  },
});

export const { setPageHead, setLang, setToken, setProfileActiveTab, addProductToCart, deleteFromCart, setFinalCart} = baristicaSlice.actions;
export default baristicaSlice.reducer;
