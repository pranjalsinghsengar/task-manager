import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  assignTasks: [],
  loading: false,
  error: null,
  isaddTask: false,
  user: null,
  isSetting: false,
};



export const createTask = createAsyncThunk(
  "tasks/create",
  async (data, { rejectWithValue }) => {
    console.log("data from slice", data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks/create`,
        data,  // Directly pass the data object here
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);  // Assuming you want to log the response data
      return response.data;  // Return the response data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const showTasks = createAsyncThunk(
  "showTasks",
  async (userId, { rejectWithValue }) => {
    // console.log("userId", data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks/read/${userId}`,

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

export const updateTask = createAsyncThunk(
  "update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks/update`,
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks/delete/${data}`,

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
export const newAssignedTask = createAsyncThunk(
  "newAssignedTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/assinedtask/create`,
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
export const getAssignedTask = createAsyncThunk(
  "getAssignedTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/assinedtask/get/${data}`,

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
        // state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        // state.loading = false;
        state.tasks.push(action.payload.tasks);
        console.log(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
        console.error(action.payload);
      })
      .addCase(showTasks.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(showTasks.fulfilled, (state, action) => {
        // state.loading = false;
        console.warn("action.payload", action.payload);
        if (action.payload.success === true) {
          if (!action.payload.tasks) {
            state.tasks = [];
          }
          localStorage.setItem("tasks", action.payload.tasks);
          state.tasks = action.payload.tasks;
          console.log("action.payload", action.payload);
        } // Assuming payload structure has a 'tasks' property
        else {
          console.error("data not fetched i think!!");
        }
      })
      .addCase(showTasks.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.updatedTask;
        console.log("action.payload", action.payload);
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
      })
      .addCase(newAssignedTask.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.assignTasks.push(action.payload.tasks);
      })
      .addCase(newAssignedTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newAssignedTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getAssignedTask.fulfilled, (state, action) => {
        state.assignTasks = action.payload.tasks;
        console.warn("getAssignedTask", action.payload);
      });
    // .addCase(fetchAssignedTasks.fulfilled, (state, action) => {
    //   // state.assignTasks = action.payload.tasks;
    //   console.warn("fatchAssignedTask", action.payload);
    // });
  },
  reducers: {
    setUserData: (state, action) => {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user = action.payload;
      }
    },
    getUserData: (state) => {
      const storedUser = localStorage.getItem("user");
      state.user = storedUser ? JSON.parse(storedUser) : null;
      console.log("user", state.user);
    },
    settingHandler: (state) => {
      state.isSetting = state.isSetting === true ? false : true;
    },

    openAddBtn: (state) => {
      state.isaddTask = state.isaddTask === true ? false : true;
    },
    allTabCloseHandler: (state) => {
      state.isaddTask = false;
      state.isSetting = false;
    },
    logoutHandler: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateStatus,
  setTasks,
  openAddBtn,
  setUserData,
  getUserData,
  allTabCloseHandler,
  settingHandler,
  logoutHandler,
} = taskSlice.actions;

export default taskSlice.reducer;
