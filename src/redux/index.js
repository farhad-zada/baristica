import { configureStore } from "@reduxjs/toolkit";
import baristicaReducer from './slice/index'


export const store = configureStore({
    reducer : {
        baristica : baristicaReducer
    }
})
