//

import { combineReducers } from "redux";
// import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
// slices
import postReducer from "./postReducer/postReducer";
import userReducer from "./userReducer/userReducer";
import chatReducer from "./chatReducer/chatReducer";
import messageReducer from "./messageReducer/messageReducer";
// dashboard

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  postReducer,
  userReducer,
  chatReducer,
  messageReducer,
});

export { rootPersistConfig, rootReducer };
