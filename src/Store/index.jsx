import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import  Taskslice  from "./slices/Taskslice";
import {persistStore,persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:"root",
    storage
}

const rootReducer=combineReducers({
    Task:Taskslice,
})

const persistedReducer=persistReducer(persistConfig,rootReducer)


export const  store=configureStore({
    reducer: persistedReducer, 
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // important to avoid redux-persist warnings
    }),
})

export const persistor=persistStore(store);