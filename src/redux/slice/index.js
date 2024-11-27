import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageHead: "",
  lang: "az",
  profileActiveTab: "personalData",
  token: false,
  user: {},
  cart: [],
  finalCart: []
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
    setUser: (state, action) => {
      state.user = action.payload
    },
    setProfileActiveTab: (state, action) => {
      state.profileActiveTab = action.payload
    },
    addProductToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find(item => item._id === product._id);

      if (existingProduct) {
        existingProduct.cartCount += product.cartCount
      } else {
        state.cart.push(product);
      }
    },
    deleteFromCart: (state, action) => {
      const id = action.payload
      state.cart = state.cart.filter((product) => product._id !== id)
    },
    setFinalCart: (state, action) => {
      const { product, checked } = action.payload
      if (checked) {
        state.finalCart.push(product)
      } else {
        state.finalCart = state.finalCart.filter((el) => el._id !== product._id)
      }
    }
  },
});

export const { 
  setPageHead,
  setLang,
  setToken,
  setProfileActiveTab,
  addProductToCart,
  deleteFromCart,
  setFinalCart,
  setUser
} = baristicaSlice.actions;
export default baristicaSlice.reducer;
