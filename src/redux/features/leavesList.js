import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseURL } from "../../constants/apiPaths";
import store from "../store";

export const getLeavesList = createAsyncThunk(
  "leaves/getLeavesList",
  async () => {
    const state = store.getState();
    const token = state?.auth?.profile?.token;
    const response = await fetch(`${BaseURL}/Leave/GetAllLeaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res);
    console.log(response, "leaveres");
    // leaveStatus: "ACCEPTED",
    const { data } = response;
    console.log(data);
    console.log(data);
    const newData = data.map((item) => {
      const {
        sickleave,
        casualleave,
        earnedleave,
        firstName,
        email,
        employeeCode,
      } = item?.user;
      return { ...item,sickleave, casualleave, earnedleave,firstName,email, employeeCode };
    });
    return { ...response, data: newData };
  }
);
export const createLeave = createAsyncThunk(
  "post/createLeave",
  // const {id,status} = data; id as app id and status as  "ACCEPTED"

  async (data) => {
    const state = store.getState();
    const token = state?.auth?.profile?.token;

    const response = await fetch(`${BaseURL}/Leave/CreateLeave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res);
    console.log(response, "res");

    return response;
  }
);
export const patchLeave = createAsyncThunk(
  "patch/patchLeave",
  // const {id,status} = data; id as app id and status as  "ACCEPTED"

  async (data) => {
    const { id, status } = data;
    const state = store.getState();
    const token = state?.auth?.profile?.token;

    if (id) {
      const response = await fetch(`${BaseURL}/Leave/UpdateLeaveById/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leaveStatus: status,
        }),
      })
        .then((res) => res.json())
        .then((res) => res);
      console.log(response, "resPatch", id);
      return response;
    }
  }
);
export const deleteLeave = createAsyncThunk(
  "delete/deleteLeave",

  async (id) => {
    const state = store.getState();
    const token = state?.auth?.profile?.token;

    const response = await fetch(`${BaseURL}/Leave/DeleteLeaveById/${id}`, {
      method: "DELETE",
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

const initialState = {
  leaves: [],
  loading: false,
  response: undefined,
};

// createSlice
export const leavesSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    resetLeaves: (state) => {
      state.employees = [];
      state.loading = false;
      state.response = undefined;
    },
    resetLeavesResponse: (state) => {
      state.response = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLeavesList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLeavesList.fulfilled, (state, action) => {
      state.leaves = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getLeavesList.rejected, (state) => {
      state.loading = false;
    });
    // create post Api
    builder.addCase(createLeave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createLeave.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(createLeave.rejected, (state) => {
      state.loading = false;
    });
    // patch Api
    builder.addCase(patchLeave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchLeave.fulfilled, (state, action) => {
      state.response = action.payload;
      // state.leaves = state?.leaves?.find(item=>item?.id===action?.payload?.data?.id)
      state.loading = false;
    });
    builder.addCase(patchLeave.rejected, (state) => {
      state.loading = false;
    });
    // delete Api
    builder.addCase(deleteLeave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteLeave.fulfilled, (state, action) => {
      state.response = action.payload;
      state.leaves = state.leaves.filter(
        (item) => item.id !== action.payload.data.id
      );
      state.loading = false;
    });
    builder.addCase(deleteLeave.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetLeaves, resetLeavesResponse } = leavesSlice.actions;
export default leavesSlice.reducer;
