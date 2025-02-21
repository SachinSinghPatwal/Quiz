import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  time: 30,
  correctAnswersCount: 0,
};

const Slice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswersCount = action.payload;
    },
  },
});
export default Slice.reducer;
export const { setCorrectAnswer, setTime } = Slice.actions;
