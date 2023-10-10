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
  isLike: false,
  error: null,
  posts: [],
  isUploading: false,
  profileUploadingDateSuccess: null,
};

const slice = createSlice({
  name: "post",
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
      state.posts = action.payload;
    },

    // CREATE USER
    createEventSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // like post
    updateLikeSuccess(state, action) {
      state.isLike = false;
      state.posts = action.payload;
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

export function getTimelinePosts(userId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${baseURL}/post/${userId}/timeline`);
      dispatch(slice.actions.getEventsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function uploadPost(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${baseURL}/post`, data);
      dispatch(slice.actions.createEventSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// --------------------------------------------------------------------

export function uploadImage(data) {
  return async () => {
    dispatch(slice.actions.startUploadLoading());
    try {
      const response = await axios.post(`${baseURL}/upload`, data);

      dispatch(slice.actions.updateProfileAttachmentsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function likePost(Id, userId) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startLike());

    try {
      const response = await axios.put(`${baseURL}/post/${Id}/like`, {
        userId: userId,
      });
      const currentState = getState();
      currentState.postReducer.isLoading = false;

      dispatch(slice.actions.updateLikeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasLikeError(error));
    }
  };
}
