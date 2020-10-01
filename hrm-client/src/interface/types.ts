import { EmployeeResponse } from "./employee";

export type TypeAction = {
  type: string;
  payload: any;
};

export type TypeState = Readonly<{
  employeeList: EmployeeResponse;
}>;
