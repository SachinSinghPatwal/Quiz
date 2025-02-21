import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";
const store = configureStore({
  reducer: {
    quiz: Slice,
  },
});

export default store;
