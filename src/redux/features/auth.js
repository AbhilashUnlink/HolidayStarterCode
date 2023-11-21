import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseURL } from "../../constants/apiPaths";


export const saveProfile = createAsyncThunk(
  "auth/saveProfile",
  async (values) => {
    const response = await fetch(`${BaseURL}/Auth/UserLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  profile: undefined,
  loading:false
};

// createSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.profile = undefined;
      state.loading = false
    },
  },
  extraReducers: (builder) => {
     builder.addCase(saveProfile.pending, (state) => {
       state.loading = true;
     });
    builder.addCase(saveProfile.fulfilled, (state, action) => {
      state.profile = action.payload.data;
       state.loading = false;
    });
     builder.addCase(saveProfile.rejected, (state) => {
       state.loading = false;
     });
  },
});

export const { resetProfile } = authSlice.actions;
export default authSlice.reducer;
