import { reducer as getEmployeeReducer } from "./getEmployee";
import { reducer as createEmployeeReducer } from "./createEmployee";
import { reducer as updateEmployeeReducer } from "./updateEmployee";
import { reducer as deleteEmployeeReducer } from "./deleteEmployee";
import { State, Action } from "../../../interface/types";
import {
  GET_EMPLOYEE,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../../../constants/actions";

const initialState: State = {
  employeeList: undefined,
};

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
    case DELETE_EMPLOYEE:
      return deleteEmployeeReducer(state, action);
    default:
      return { ...state };
    // newState = state;
    // break;
  }
  // return reducers.reduce((s, r) => r(s, action), state);
}
