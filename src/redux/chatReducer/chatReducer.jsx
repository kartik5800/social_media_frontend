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
  chat: [],
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // GET Chat
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.chat = action.payload;
    },

    // CREATE Chat
    createEventSuccess(state, action) {
      state.isLoading = false;
      state.chat = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------

export function userChats(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${baseURL}/chat/${id}`);
      dispatch(slice.actions.getEventsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------

// export function uploadPost(data) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(`${baseURL}/post`, data);
//       dispatch(slice.actions.createEventSuccess(response.data));
//       window.location.reload();
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------
