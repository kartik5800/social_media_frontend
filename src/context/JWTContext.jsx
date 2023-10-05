import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

// Define your initial state
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

// Define action handlers
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
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

// Define the reducer
const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// Create the AuthContext
const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
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
        },
      });
    }
  }, []);

  // Define your login function
  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );

      const { user, token } = response.data;
      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem("userData", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Define your register function
  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        data
      );
      const { user, token } = response.data;
      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem("userData", JSON.stringify(user));
      dispatch({
        type: "REGISTER",
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
