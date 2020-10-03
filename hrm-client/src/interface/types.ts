import { EmployeeResponse } from "./employee";

export type Action = {
  type: string;
  payload: any;
};

export type State = Readonly<{
  employeeList: EmployeeResponse;
}>;
