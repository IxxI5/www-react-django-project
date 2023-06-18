import { createSlice } from "@reduxjs/toolkit";

/**
 * @description: the initial state of the user reducer
 */
const initialState = {
  values: {
    username: "",
    password: "",
    loggedin: false,
  },
};

/**
 * @description: methods for accessing the state of the user reducer
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.values = action.payload;
    },

    userLogout: (state) => {
      state.values = initialState.values;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
