//

import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
//
import { dispatch } from "../store";

// ----------------------------------------------------------------------
const baseURL = process.env.REACT_APP_BASE_URL;

const initialState = {
  isLoading: false,
  error: null,
  messages: [],
};

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // GET messages
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.messages = action.payload;
    },

    // CREATE messages
    createEventSuccess(state, action) {
      state.isLoading = false;
      state.messages = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMessages(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${baseURL}/message/${id}`);
      dispatch(slice.actions.getEventsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addMessage(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${baseURL}/message`, data);
      dispatch(slice.actions.createEventSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// --------------------------------------------------------------------
