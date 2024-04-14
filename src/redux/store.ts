import { configureStore} from "@reduxjs/toolkit";
import RootReducer from "./rootReducer";

export const store = configureStore({reducer:RootReducer})

export type IRootState = ReturnType<typeof store.getState>