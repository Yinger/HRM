import { Dispatch } from "redux";
import _ from "lodash";
import { post } from "../../../utils/request";
import { Action, State } from "../../../interface/types";
import { EmployeeInfo, UpdateRequest } from "../../../interface/employee";
import { UPDATE_EMPLOYEE_URL } from "../../../constants/urls";
import { UPDATE_EMPLOYEE } from "../../../constants/actions";

export function updateEmployee(param: UpdateRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    post(UPDATE_EMPLOYEE_URL, param).then((res) => {
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: param,
      });
      callback();
    });
  };
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case UPDATE_EMPLOYEE:
      let updatedList = [...(state.employeeList as EmployeeInfo[])];
      let item: UpdateRequest = action.payload;
      let index = _.findIndex(updatedList, {
        id: item.id,
      });
      updatedList[index] = {
        id: item.id,
        key: item.id,
        name: item.name,
        department: item.department,
        departmentId: item.departmentId,
        hiredate: item.hiredate,
        level: item.level,
        levelId: item.levelId,
      };
      return {
        ...state,
        employeeList: updatedList,
      };

    default:
      return state;
  }
}
