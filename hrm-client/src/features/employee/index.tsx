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
  UpdateRequest,
  DeleteRequest,
} from "../../interface/employee";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../employee/redux/actions";

interface Props {
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  onCreateEmployee(param: CreateRequest, callback: () => void): void;
  onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
  onDeleteEmployee(param: DeleteRequest): void;
  employeeList: EmployeeResponse;
}

const Employee = (props: Props) => {
  // const [employee, setEmployee] = useState<EmployeeResponse>(undefined);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowData, setRowData] = useState<Partial<EmployeeInfo>>({});

  const hideModal = () => {
    setRowData({});
    setShowModal(false);
  };

  const handleCreate = () => {
    setRowData({});
    setShowModal(true);
    setEdit(false);
  };

  const handleUpdate = (record: EmployeeInfo) => {
    setShowModal(true);
    setEdit(true);
    setRowData(record);
  };

  const handleDelete = (param: DeleteRequest) => {
    props.onDeleteEmployee(param);
  };

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
        columns={DataColumns(handleUpdate, handleDelete)}
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
      onDeleteEmployee: deleteEmployee,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
