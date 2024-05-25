import { configureStore } from "@reduxjs/toolkit";

import trainerReducer from "./trainerReducer"

export const store = configureStore({
    reducer:{
        trainers: trainerReducer
    }
})