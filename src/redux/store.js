import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./slice";

export default configureStore({
  reducer: {
    allTasks: taskSlice.reducer,
  },
});
