import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const breadcurmbSlice = createSlice({
  name: "breadcurmb",
  initialState,
  reducers: {
    setBreadcrumb: (state, action) => {
        state.items = [...action.payload]
    },

    clearBreadcrumb: () => {
      return initialState;
    },
  },
});

export const { setBreadcrumb, clearBreadcrumb } = breadcurmbSlice.actions;

export default breadcurmbSlice.reducer;