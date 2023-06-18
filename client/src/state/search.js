import { createSlice } from "@reduxjs/toolkit";

/**
 * @description: the initial state of the search reducer
 */
const initialState = {
  values: { fromDate: "", toDate: "", search: "", category: "" },
};

/**
 * @description: methods for accessing the state of the search reducer
 */
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    userSearch: (state, action) => {
      state.values = action.payload;
    },

    userSearchReset: (state) => {
      state.values = initialState.values;
    },
  },
});

export const { userSearch, userSearchReset } = searchSlice.actions;
export default searchSlice.reducer;
