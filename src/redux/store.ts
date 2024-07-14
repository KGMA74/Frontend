import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/redux/features/authSlice'

export const Store = () => 
    configureStore({
        reducer: {
            auth: authReducer
        },
        devTools: process.env.NODE_ENV !== 'production'
    });


export type AppStore = ReturnType<typeof Store>;
export type RootState = ReturnType<AppStore['getState']>;
export type Appdispatch = AppStore['dispatch'];