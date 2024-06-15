import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data, { rejectWithValue }) => {
    console.log("data from slice", data);
    try {
      const response = await axios.post(
        // "https://666d790f7a3738f7cacc75fc.mockapi.io/new",
        `${process.env.REACT_APP_API_URL}create/`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.warn(response.data);
      return response.data; // Return the data from the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const showTasks = createAsyncThunk(
  "showTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}update/`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "delete",
  async (data, { rejectWithValue }) => {
    const payload = {
      _id: data,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}delete`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload.tasks);
        // console.log(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showTasks.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success === true) {
          state.tasks = action.payload.tasks;
        } // Assuming payload structure has a 'tasks' property
        else {
          console.error("data not fetched i think!!");
        }
      })
      .addCase(showTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.updatedTask;
        if (updatedTask) {
          state.tasks = state.tasks.map((item) =>
            item._id === updatedTask._id
              ? { ...item, status: updatedTask.status }
              : item
          );
          console.log(updatedTask);
          // console.log(abc);
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.success === true) {
          console.log("delted", action.payload);
          state.tasks = state.tasks.filter(
            (item) => item._id !== payload.deletedId
          );
        }
      });
  },
});

export const { addTask, removeTask, updateStatus, setTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
