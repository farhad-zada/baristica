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
    setCart:(state,action) =>{
        state.cart=action.payload
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
      state.finalCart = state.finalCart.filter((product) => product._id !== id)
    },
    finalSelectProduct: (state, action) => {
      const { id, selected } = action.payload
      state.cart = state.cart.map((product) => {
        if (id === product._id) {
          return { ...product, selectedForOrder: selected }
        } else {
          return product
        }
      })

      if (!selected) {
        state.finalCart = state.finalCart.filter((product) => product._id !== id)
      }
    },
    changeCartCount: (state, action) => {
      const { id, type } = action.payload
      state.finalCart = state.finalCart.map((product) => {
        if (product._id === id) {
          return { ...product, cartCount: type === 'increase' ? product.cartCount + 1 : product.cartCount - 1 }
        } else {
          return product
        }
      })

      state.cart = state.cart.map((product) => {
        if (product._id === id) {
          return { ...product, cartCount: type === 'increase' ? product.cartCount + 1 : product.cartCount - 1 }
        } else {
          return product
        }
      })
    },
    setFinalCart: (state, action) => {
      const { product, checked } = action.payload
      if (checked) {
        state.finalCart.push(product)
      } else {
        state.finalCart = state.finalCart.filter((el) => el._id !== product._id)
      }
    },
    setFinalCartArr: (state,action) => {
      state.finalCart = action.payload
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
  finalSelectProduct,
  changeCartCount,
  setCart,
  setFinalCart,
  setFinalCartArr,
  setUser
} = baristicaSlice.actions;
export default baristicaSlice.reducer;
