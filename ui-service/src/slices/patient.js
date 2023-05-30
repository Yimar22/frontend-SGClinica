import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PatientService from "../services/patient.service";

const initialState = {
  loading: false,
  patients: [],
  patient: {
    id: "",
    creationDate: "",
    personalInformation: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      gender: {
        id: "",
        name: "",
      },
      civilStatus: {
        id: "",
        name: "",
      },
      phoneNumber: "",
      address: "",
      age: "",
    },
    diseaseHistorial: {
      firstDisease: {
        code: "",
        name: "",
      },
      secondDisease: {
        code: "",
        name: "",
      },
      thirdDisease: {
        code: "",
        name: "",
      },
      fourthDisease: {
        code: "",
        name: "",
      },
    },
    nationalityStateRetrievalDTO: {
      nationality: "",
      nationalityStateCode: "",
      nationalityStateName: "",
    },
  },
};

export const registerPatient = createAsyncThunk(
  "user/registerPatient",
  async (
    { id, personalInformation, diseaseHistorial, nationalityState },
    thunkAPI
  ) => {
    try {
      const response = await PatientService.registerPatient(
        id,
        personalInformation,
        diseaseHistorial,
        nationalityState
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
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

export const getAllPatients = createAsyncThunk(
  "patient/getAllPatients",
  async (thunkAPI) => {
    try {
      const data = await PatientService.getAllPatients();
      return { patients: data };
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

export const getPatientById = createAsyncThunk(
  "patient/getPatientById",
  async (id, thunkAPI) => {
    try {
      const data = await PatientService.getPatientById(id);
      return { patient: data };
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

const patientSlice = createSlice({
  name: "patient",
  initialState,
  extraReducers: {
    [registerPatient.pending]: (state, action) => {
      state.loading = true;
    },
    [registerPatient.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [registerPatient.rejected]: (state, action) => {
      state.loading = false;
    },
    [getAllPatients.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPatients.fulfilled]: (state, action) => {
      state.loading = false;
      state.patients = action.payload.patients;
    },
    [getAllPatients.rejected]: (state, action) => {
      state.loading = false;
    },
    [getPatientById.pending]: (state, action) => {
      state.loading = true;
    },
    [getPatientById.fulfilled]: (state, action) => {
      state.loading = false;
      state.patient = action.payload.patient;
    },
    [getPatientById.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = patientSlice;
export default reducer;
