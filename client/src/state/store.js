import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user"; // import userSlice.reducer as userReducer
import searchReducer from "./search"; // import searchSlice.reducer as searchReducer
/**
 * @returns the redux store instance to access the App state through reducers (over the dispatch method)
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});
