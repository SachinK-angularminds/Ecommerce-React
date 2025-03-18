import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "./redux/authSlice";
import { postDataApi } from "./api/userapi/postDataApi";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["authReducer"], // Persist ONLY authReducer, NOT postDataApi

    // Specify the reducers you want to persist
  };
  const rootReducer = combineReducers({  
      authReducer: authSlice,
      [postDataApi.reducerPath]:postDataApi.reducer 
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(postDataApi.middleware)

  });
  export const persistor = persistStore(store);