import { GET_EMPLOYEE } from "../../../constants/actions";
import { TypeAction, TypeState } from "../../../interface/types";
import { EmployeeRequest } from "../../../interface/employee";
import { GET_EMPLOYEE_URL } from "../../../constants/urls";
import { Dispatch } from "redux";
import { get } from "../../../utils/request";

export function getEmployee(param: EmployeeRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    get(GET_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data,
      });
      callback();
    });
  };
}

export function reducer(state: TypeState, action: TypeAction) {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload,
      };

    default:
      return state;
  }
}
