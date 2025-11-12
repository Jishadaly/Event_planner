// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage" // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist"
import authReducer from "../global/authSlice"

const rootReducer = combineReducers({
  auth: authReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
})

export const persistor = persistStore(store)
