import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user, isAuthenticated } = action.payload;
    return {
      ...state,
      isAuthenticated,
      user,
    };
  },
  REGISTER: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      user,
    };
  },
  UPDATE_USER_IN_AUTH: (state, action) => {
    console.log("jwt context", state, action);
    return {
      ...state,
      user: action.payload,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateUserInAuth: (user) => {},
});

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    const expiresAt = JSON.parse(
      window.localStorage.getItem("token_expires_in")
    );

    if (accessToken && new Date().getTime() < expiresAt) {
      const user = JSON.parse(window.localStorage.getItem("userData"));

      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } else {
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );

      const { user, token, expiresIn } = response.data;

      const expirationTime = Date.now() + expiresIn;

      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem("token_expires_in", expirationTime);
      window.localStorage.setItem("userData", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (error) {
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      console.error("Login error:", error);
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        data
      );
      const { user, token, expiresIn } = response.data;
      const expirationTime = Date.now() + expiresIn;
      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem("token_expires_in", expirationTime);
      window.localStorage.setItem("userData", JSON.stringify(user));
      dispatch({
        type: "REGISTER",
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (error) {
      dispatch({
        type: "REGISTER",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      console.error("Registration error:", error);
    }
  };

  const updateUserInAuth = (user) => {
    window.localStorage.setItem("userData", JSON.stringify(user));
    dispatch({
      type: "UPDATE_USER_IN_AUTH",
      payload: user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        register,
        updateUserInAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
