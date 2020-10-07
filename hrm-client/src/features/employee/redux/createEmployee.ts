import { Dispatch } from "redux";
import { post } from "../../../utils/request";
import { Action, State } from "../../../interface/types";
import { EmployeeInfo, CreateRequest } from "../../../interface/employee";
import { CREATE_EMPLOYEE_URL } from "../../../constants/urls";
import { CREATE_EMPLOYEE } from "../../../constants/actions";

export function createEmployee(param: CreateRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    // console.log(param.departmentId);
    post(CREATE_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: CREATE_EMPLOYEE,
        payload: {
          name: param.name,
          department: param.department,
          departmentId: param.departmentId,
          hiredate: param.hiredate,
          level: param.level,
          levelId: param.levelId,
          ...res.data,
        },
      });
      callback();
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case CREATE_EMPLOYEE:
      let newList = [action.payload, ...(state.employeeList as EmployeeInfo[])];
      return {
        ...state,
        employeeList: newList,
      };

    default:
      return state;
  }
}
