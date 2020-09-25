import React, { useState } from "react";
import { Table, Button } from "antd";

import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import "./index.scss";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";

import QueryForm from "./QueryForm";
import InfoModal from "./InfoModal";

import getColunms from "./colums";
import { DOWNLOAD_EMPLOYEE_URL } from "../../constants/urls";
import {
  EmployeeInfo,
  EmployeeRequest,
  EmployeeResponse,
  CreateRequest,
  DeleteRequest,
  UpdateRequest,
} from "../../interface/employee";
import {
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../redux/employee";

interface Props {
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  onCreateEmployee(param: CreateRequest, callback: () => void): void;
  onDeleteEmployee(param: DeleteRequest): void;
  onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
  // employeeList: EmployeeResponse;
}

const Employee = (props: Props) => {
  const [employeeList, setEmployeeList] = useState<EmployeeResponse>(undefined);
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

  const handleDelete = (param: DeleteRequest) => {
    props.onDeleteEmployee(param);
  };

  const handleUpdate = (record: EmployeeInfo) => {
    setShowModal(true);
    setEdit(true);
    setRowData(record);
  };

  const handleDownload = () => {
    window.open(DOWNLOAD_EMPLOYEE_URL);
  };

  // const getTotal = () => {
  //   let total: number;
  //   if (typeof employee !== "undefined") {
  //     total = employee.length;
  //   } else {
  //     total = 0;
  //   }
  //   return <p>共 {total} 名员工</p>;
  // };

  return (
    <>
      <QueryForm
        onDataChange={setEmployeeList}
        setLoading={setLoading}
        getData={props.onGetEmployee}
      />
      <div className="toolbar">
        <Button type="primary" onClick={handleCreate}>
          {/* <PlusOutlined /> */}
          新規
        </Button>
        <Button
          type="primary"
          // icon={<DownloadOutlined />}
          onClick={handleDownload}
          className="right"
        >
          {/* <DownloadOutlined /> */}
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
        columns={getColunms(handleUpdate, handleDelete)}
        dataSource={employeeList}
        loading={loading}
        className="table"
        pagination={false}
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
      onDeleteEmployee: deleteEmployee,
      onUpdateEmployee: updateEmployee,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

// export default Employee;
