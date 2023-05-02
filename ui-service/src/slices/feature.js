import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import FeatureService from "../services/feature.service";

const initialState = {
  loading: false,
  features: [],
};

export const getAllFeatures = createAsyncThunk(
  "feature/getAllFeatures",
  async (thunkAPI) => {
    try {
      const data = await FeatureService.getAllFeatures();
      return { features: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const featureSlice = createSlice({
  name: "feature",
  initialState,
  extraReducers: {
    [getAllFeatures.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllFeatures.fulfilled]: (state, action) => {
      state.features = action.payload.features;
      state.loading = false;
    },
    [getAllFeatures.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = featureSlice;
export default reducer;
