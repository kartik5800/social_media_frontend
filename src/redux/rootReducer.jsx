//

import { combineReducers } from "redux";
// import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
// slices
import postReducer from "./postReducer/postReducer";
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
});

export { rootPersistConfig, rootReducer };
