//

import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
//
import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  users: {},
  isUploading: false,
  profileUploadingDateSuccess: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // START LIKING
    startLike(state) {
      state.isLike = true;
    },

    // HAS  LIKE ERROR
    hasLikeError(state, action) {
      state.isLike = false;
      state.error = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USER
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // CREATE USER
    createEventSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // UPDATE USER
    updateEventSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },

    // Attachments Uploading
    startUploadLoading(state, action) {
      state.isUploading = true;
      state.successMessage = null;
      state.profileUploadingDateSuccess = null;
    },

    updateProfileAttachmentsSuccess(state, action) {
      state.isUploading = false;
      state.profileUploadingDateSuccess = action?.payload?.message;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUser(profileUserId) {
  return async (dispatch) => {
    // Pass `dispatch` as an argument
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `http://localhost:8080/user/${profileUserId}`
      );

      console.log("================", response);
      dispatch(slice.actions.getEventsSuccess(response.data));

      return response.data; // Return the data from the function
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error; // Throw the error so you can handle it in the component
    }
  };
}

// ----------------------------------------------------------------------
export function updateUser(userId, UserData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `http://localhost:8080/user/${userId}`,
        UserData
      );
      dispatch(slice.actions.updateEventSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
