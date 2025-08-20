import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice.js";
import watchListReducer from "./watchListSlice.js";

const store = configureStore({
  reducer: {
    data: dataReducer,
    favorite: watchListReducer,
  },
});

export default store;
