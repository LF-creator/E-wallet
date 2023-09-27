import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cardSlice from "./cardSlice";

const reducer = combineReducers({
  cardInfo: cardSlice
});

const store = configureStore({
  reducer
});

export default store;
