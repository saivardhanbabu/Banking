import {configureStore} from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice'
import userTransferSlice from './slices/userTransferSlice';
import React from 'react'

export const reduxStore=configureStore({
    reducer:{
        userLogin:userLoginReducer,
        transfer:userTransferSlice
    }
})