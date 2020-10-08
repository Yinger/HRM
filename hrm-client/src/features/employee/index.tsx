import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Button, Table } from "antd";
import QueryForm from "./components/queryForm";
import InfoModal from "./components/infoModal";
import "./index.scss";
import DataColumns from "./components/dataColumns";

import {
  EmployeeInfo,
  EmployeeResponse,
  EmployeeRequest,
  CreateRequest,
  // DeleteRequest,
  UpdateRequest,
} from "../../interface/employee";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
} from "../employee/redux/actions";

interface Props {
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  onCreateEmployee(param: CreateRequest, callback: () => void): void;
  onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
  employeeList: EmployeeResponse;
}

const Employee = (props: Props) => {
  // const [employee, setEmployee] = useState<EmployeeResponse>(undefined);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowData, setRowData] = useState<Partial<EmployeeInfo>>({});

  const hideModal = () => {
    setShowModal(false);
    setRowData({});
  };

  const handleCreate = () => {
    setShowModal(true);
    setEdit(false);
    setRowData({});
  };

  const handleUpdate = (record: EmployeeInfo) => {
    setShowModal(true);
    setEdit(true);
    setRowData(record);
  };

  // render(){
  //   const {
  //     employeeList,
  //     onGetEmployee,
  //     onCreateEmployee,
  //     onUpdateEmployee
  // } = props;
  // return(<></>);
  // }

  return (
    <>
      <QueryForm
        // onDataChange={setEmployee}
        setLoading={setLoading}
        getData={props.onGetEmployee}
      />
      <div className="toolbar">
        <Button type="primary" onClick={handleCreate}>
          新規
        </Button>
        <Button type="primary" className="right">
          Export
        </Button>
      </div>
      <InfoModal
        visible={showModal}
        edit={edit}
        rowData={rowData}
        hide={hideModal}
        createData={props.onCreateEmployee}
        updateData={props.onUpdateEmployee}
      />
      <Table
        columns={DataColumns(handleUpdate)}
        dataSource={props.employeeList}
        loading={loading}
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
      onCreateEmployee: createEmployee,
      onUpdateEmployee: updateEmployee,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
