import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import { v4 as uuid } from "uuid";
import {
  MIN_ANSWERS_PER_QUESTION,
  MIN_QUESTIONS_PER_CLINIC_HISTORY,
} from "../utils/ClinicHistoryFormat";
import ClinicHistoryService from "../services/clinicHistory.service";
const defaultQuestion = {
  id: uuid(),
  content: "",
  questionIndex: "",
  type: "",
  answers: [
    {
      id: uuid(),
      content: "",
    },
  ],
};
const defaultClinicHistory = {
  id: uuid(),
  content: "",
  description: "",
  opened: true,
  questions: [defaultQuestion],
};

const initialState = {
  ...defaultClinicHistory,
  loading: false,
  clinicHistoryFormats: [],
  clinicHistory: {
    id: "",
    name: "",
    description: "",
    enabled: "",
    createdAt: "",
    payload: [],
  },
};

export const getAllClinicHistoryFormats = createAsyncThunk(
  "clinicHistory/getAllClinicHistoryFormats",
  async (thunkAPI) => {
    try {
      const data = await ClinicHistoryService.getAllClinicHistoryFormats();
      return { clinicHistoryFormats: data };
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

export const getClinicHistoryFormatById = createAsyncThunk(
  "clinicHistory/getClinicHistoryFormatById",
  async (id, thunkAPI) => {
    try {
      const data = await ClinicHistoryService.getClinicHistoryFormatById(id);
      return { clinicHistory: data };
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

const orderQuestionsInArray = (state) => {
  for (let i = 0; i < state.questions.length; i++) {
    state.questions[i].questionIndex = i + 1;
  }
};
const clinicHistorySlice = createSlice({
  name: "clinicHistory",
  initialState: initialState,
  reducers: {
    clinicHistoryContent: (state, action) => {
      state.content = action.payload;
    },
    clinicHistoryDescription: (state, action) => {
      state.description = action.payload;
    },
    questionContent: (state, action) => {
      state.questions[action.payload.index].content = action.payload.content;
    },
    changeQuestionType: (state, action) => {
      state.questions[action.payload.index].type = action.payload.value;
    },
    answerContent: (state, action) => {
      const { index, answerIndex, content } = action.payload;
      state.questions[index].answers[answerIndex].content = content;
    },
    newQuestion: (state, action) => {
      const { index } = action.payload;
      const questionIndex =
        state.questions[state.questions.length - 1].questionIndex + 1;
      state.questions.splice(index + 1, 0, {
        ...defaultQuestion,
        id: uuid(),
        questionIndex: questionIndex,
      });
      orderQuestionsInArray(state);
    },
    newAnswer: (state, action) => {
      const { index } = action.payload;
      state.questions[index].answers.push({ id: uuid(), content: "" });
    },
    removeAnswer: (state, action) => {
      const { index, answerId } = action.payload;
      if (state.questions[index].answers.length > MIN_ANSWERS_PER_QUESTION) {
        state.questions[index].answers = state.questions[index].answers.filter(
          (a) => a.id !== answerId
        );
      }
    },
    removeQuestion: (state, action) => {
      if (state.questions.length > MIN_QUESTIONS_PER_CLINIC_HISTORY) {
        state.questions = state.questions.filter(
          (q) => q.id !== action.payload.questionId
        );
      }
    },
    orderQuestions: (state, action) => {
      const { source, destination } = action.payload;
      const [question] = state.questions.splice(source, 1);
      state.questions.splice(destination, 0, question);
      orderQuestionsInArray(state);
    },
  },
  extraReducers: {
    [getAllClinicHistoryFormats.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllClinicHistoryFormats.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinicHistoryFormats = action.payload.clinicHistoryFormats;
    },
    [getAllClinicHistoryFormats.rejected]: (state, action) => {
      state.loading = false;
    },
    [getClinicHistoryFormatById.pending]: (state, action) => {
      state.loading = true;
    },
    [getClinicHistoryFormatById.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinicHistory = action.payload.clinicHistory;
      state.clinicHistory.payload = JSON.parse(
        action.payload.clinicHistory.payload
      );
    },
    [getClinicHistoryFormatById.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = clinicHistorySlice;
export default reducer;
export const {
  clinicHistoryContent,
  clinicHistoryDescription,
  questionContent,
  changeQuestionType,
  answerContent,
  newQuestion,
  newAnswer,
  removeAnswer,
  removeQuestion,
  orderQuestions,
} = clinicHistorySlice.actions;
