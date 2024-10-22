import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageHead: "",
  lang: "az",
  token: true
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
    setToken : (state,action)=> {
      state.token= action.payload
    }
  },
});

export const { setPageHead, setLang, setToken } = baristicaSlice.actions;
export default baristicaSlice.reducer;
