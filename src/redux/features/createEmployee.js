import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseURL } from "../../constants/apiPaths";
import store from "../store";

export const createEmployee = createAsyncThunk(
  "create/createEmployee",
  async (values) => {
    const state = store.getState();
    const token = state?.auth?.profile?.token;

    const response = await fetch(`${BaseURL}/Employee/CreateEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...values }),
    })
      .then((res) => res.json())
      .then((res) => res);
    console.log(response, "res");

    return response;
  }
);


const initialState = {
  response: undefined,
  loading: false,
};

export const createEmployeeSlice = createSlice({
  name: "createEmployee",
  initialState,
  reducers: {
    resetCreateEmployee: (state) => {
      state.response = undefined;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(createEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(createEmployee.rejected, (state) => {
      state.loading = false;
    });
    
  },
});

export const { resetCreateEmployee } = createEmployeeSlice.actions;
export default createEmployeeSlice.reducer;
