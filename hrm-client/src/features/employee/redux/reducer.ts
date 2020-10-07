import { reducer as getEmployeeReducer } from "./getEmployee";
import { reducer as createEmployeeReducer } from "./createEmployee";
import { reducer as updateEmployeeReducer } from "./updateEmployee";
import { State, Action } from "../../../interface/types";
import {
  GET_EMPLOYEE,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../../../constants/actions";

const initialState: State = {
  employeeList: undefined,
};

// const reducers = [
//   getEmployeeReducer,
//   createEmployeeReducer,
//   updateEmployeeReducer,
// ];

export default function reducer(state = initialState, action: Action) {
  // console.log(state);
  // // let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    case GET_EMPLOYEE:
      return getEmployeeReducer(state, action);
    case CREATE_EMPLOYEE:
      return createEmployeeReducer(state, action);
    case UPDATE_EMPLOYEE:
      return updateEmployeeReducer(state, action);
    default:
      return { ...state };
    // newState = state;
    // break;
  }
  // return reducers.reduce((s, r) => r(s, action), state);
}
