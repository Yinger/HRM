import { reducer as getEmployeeReducer } from "./getEmployee";
import { TypeState, TypeAction } from "../../../interface/types";

const initialState: TypeState = {
  employeeList: undefined,
};

const reducers = [getEmployeeReducer];

export default function reducer(state = initialState, action: TypeAction) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
