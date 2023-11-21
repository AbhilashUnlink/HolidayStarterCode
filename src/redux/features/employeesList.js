import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseURL } from "../../constants/apiPaths";
import store from "../store";

export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async () => {
    const state = store.getState();
    const token = state?.auth?.profile?.token;
    const response = await fetch(`${BaseURL}/Employee/GetAllEmployees`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res);
    console.log(response, "res");

    return response;
  }
);
export const deleteEmployee = createAsyncThunk(
  "delete/deleteEmployee",
  async (id) => {
    const state = store.getState();
    const token = state?.auth?.profile?.token;

    const response = await fetch(
      `${BaseURL}/Employee/DeleteEmployeeById/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res);
    console.log(response, "res");

    return response;
  }
);

const initialState = {
  employees: [],
  loading: false,
};

// createSlice
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    reset: (state) => {
      state.employees = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employees = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getEmployees.rejected, (state) => {
      state.loading = false;
    });
    // Delete Api
    builder.addCase(deleteEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.response = action.payload;
      state.employees = state.employees.filter(
        (item) => item.id !== action.payload.data.id
      );
      state.loading = false;
    });
    builder.addCase(deleteEmployee.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reset } = employeesSlice.actions;
export default employeesSlice.reducer;
