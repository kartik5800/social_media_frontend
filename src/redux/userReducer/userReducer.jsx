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
  users: {},
  allusers: [],
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

    // GET LL USER
    getAllUserEventsSuccess(state, action) {
      state.isLoading = false;
      state.allusers = action.payload;
    },

    // UPDATE USER
    updateEventSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    followUserSuccess(state, action) {
      state.users = {
        ...state.users,
        following: [...state.users.following, action.payload],
      };
    },

    unfollowUserSuccess(state, action) {
      state.users = {
        ...state.users,
        following: state.users.following.filter(
          (personId) => personId !== action.payload
        ),
      };
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllUser() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${baseURL}/user`);
      dispatch(slice.actions.getAllUserEventsSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function getUser(profileUserId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${baseURL}/user/${profileUserId}`);
      dispatch(slice.actions.getEventsSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------
export function updateUser(userId, UserData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`${baseURL}/user/${userId}`, UserData);
      dispatch(slice.actions.updateEventSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function followUser(userId, currentUserId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `${baseURL}/user/${userId}/follow`,
        currentUserId
      );
      dispatch(slice.actions.followUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function unFollowUser(userId, currentUserId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `${baseURL}/user/${userId}/unfollow`,
        currentUserId
      );
      dispatch(slice.actions.unfollowUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
