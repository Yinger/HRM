import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Button, Table } from "antd";
import QueryForm from "./components/queryForm";
import "./index.scss";
import DataColumns from "./components/dataColumns";
import { EmployeeResponse, EmployeeRequest } from "../../interface/employee";
import { getEmployee } from "../employee/redux/actions";

interface Props {
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  employeeList: EmployeeResponse;
}

const Employee = (props: Props) => {
  const [employeeList, setEmployeeList] = useState<EmployeeResponse>(undefined);
  return (
    <>
      <QueryForm
        onDataChange={setEmployeeList}
        // getData={props.onGetEmployee}
      />
      <div className="toolbar">
        <Button type="primary">新規</Button>
        <Button type="primary" className="right">
          Export
        </Button>
      </div>
      <Table
        columns={DataColumns()}
        dataSource={employeeList}
        className="table"
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  employeeList: state.employee.employeeList,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onGetEmployee: getEmployee,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
