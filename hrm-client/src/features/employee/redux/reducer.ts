import { reducer as getEmployeeReducer } from "./getEmployee";
import { reducer as createEmployeeReducer } from "./createEmployee";
import { reducer as updateEmployeeReducer } from "./updateEmployee";
import { State, Action } from "../../../interface/types";

const initialState: State = {
  employeeList: undefined,
};

const reducers = [
  getEmployeeReducer,
  createEmployeeReducer,
  updateEmployeeReducer,
];

export default function reducer(state = initialState, action: Action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
