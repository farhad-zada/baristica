import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageHead: "",
};

const baristicaSlice = createSlice({
  name: "baristica",
  initialState,
  reducers: {
    setPageHead: (state, action) => {
      state.pageHead = action.payload;
    },
  },
});

export const { setPageHead } = baristicaSlice.actions;
export default baristicaSlice.reducer;
