import React, { useState } from "react";
import { Table } from "antd";

import "./index.scss";

import QueryForm from "./QueryForm";

import { employeeColumns } from "./colums";
import { EmployeeResponse } from "../../interface/employee";

const Employee = () => {
  const [employee, setEmployee] = useState<EmployeeResponse>(undefined);

  const getTotal = () => {
    let total: number;
    if (typeof employee !== "undefined") {
      total = employee.length;
    } else {
      total = 0;
    }
    return <p>共 {total} 名员工</p>;
  };

  return (
    <>
      <QueryForm onDataChange={setEmployee} />
      {/* {{ getTotal() }} */}
      <Table
        columns={employeeColumns}
        dataSource={employee}
        className="table"
      />
    </>
  );
};

export default Employee;
