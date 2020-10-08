import { Dispatch } from "redux";
import _ from "lodash";
import { post } from "../../../utils/request";
import { Action, State } from "../../../interface/types";
import { EmployeeInfo, DeleteRequest } from "../../../interface/employee";
import { DELETE_EMPLOYEE_URL } from "../../../constants/urls";
import { DELETE_EMPLOYEE } from "../../../constants/actions";

export function deleteEmployee(param: DeleteRequest) {
  return (dispatch: Dispatch) => {
    post(DELETE_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: param.id,
      });
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case DELETE_EMPLOYEE:
      let reducedList = [...(state.employeeList as EmployeeInfo[])];
      _.remove(reducedList, (item: EmployeeInfo) => {
        return item.id === action.payload;
      });
      return {
        ...state,
        employeeList: reducedList,
      };

    default:
      return { ...state };
  }
}
