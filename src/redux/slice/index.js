import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageHead: "",
  lang: "az"
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
    }
  },
});

export const { setPageHead, setLang } = baristicaSlice.actions;
export default baristicaSlice.reducer;
