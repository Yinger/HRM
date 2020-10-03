import { reducer as getEmployeeReducer } from "./getEmployee";
import { State, Action } from "../../../interface/types";

const initialState: State = {
  employeeList: undefined,
};

const reducers = [getEmployeeReducer];

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
