import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    isHandy: false,
    isAuthenticated: false
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload.user.userId;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.isHandy = action.payload.user.isHandy;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.isHandy = false;
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
