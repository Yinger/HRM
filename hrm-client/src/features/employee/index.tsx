import React from "react";
import { Button, Table } from "antd";
import QueryForm from "./components/queryForm";
import "./index.scss";
import DataColumns from "./components/dataColumns";

const Employee = () => {
  return (
    <>
      <QueryForm />
      <div className="toolbar">
        <Button type="primary">新規</Button>
        <Button type="primary" className="right">
          Export
        </Button>
      </div>
      <Table columns={DataColumns()} />
    </>
  );
};
export default Employee;
