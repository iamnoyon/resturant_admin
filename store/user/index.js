import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: "",
  email: "",
  role: "",
  profile_photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;