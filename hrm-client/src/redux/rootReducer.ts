import { combineReducers } from "redux";
import employee from "../features/employee/redux/reducer";

const reducers = {
  employee,
};

export default combineReducers(reducers);
