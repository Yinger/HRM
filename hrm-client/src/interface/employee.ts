// getEmployee
export interface EmployeeRequest {
  name?: string;
  departmentId?: number;
}
export interface EmployeeInfo {
  id: number;
  key: number;
  name: string;
  department: string;
  departmentId: number;
  hiredate: string;
  level: string;
  levelId: number;
}
export type EmployeeResponse = EmployeeInfo[] | undefined;

// createEmployee
export interface CreateRequest {
  name: string;
  departmentId: number;
  department: string;
  hiredate: string;
  levelId: number;
  level: string;
}
export interface CreateResponse {
  id: number;
  key: number;
}

// updateEmployee
export interface UpdateRequest {
  id: number;
  name: string;
  departmentId: number;
  department: string;
  hiredate: string;
  levelId: number;
  level: string;
}

// deleteEmployee
export interface DeleteRequest {
  id: number;
}
