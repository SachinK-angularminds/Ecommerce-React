import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "./redux/authSlice";

const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
  };
  const rootReducer = combineReducers({
    authReducer: authSlice,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
  });
  export const persistor = persistStore(store);