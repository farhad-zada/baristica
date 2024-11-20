import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageHead: "",
  lang: "az",
  profileActiveTab: "personalData",
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
    setToken: (state, action) => {
      state.token = action.payload
    },
    setProfileActiveTab: (state, action) => {
      state.profileActiveTab = action.payload
    }
  },
});

export const { setPageHead, setLang, setToken, setProfileActiveTab } = baristicaSlice.actions;
export default baristicaSlice.reducer;
