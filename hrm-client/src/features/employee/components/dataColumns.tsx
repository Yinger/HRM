import React from "react";
import { Button, Divider, Popconfirm } from "antd";
import { EmployeeInfo, DeleteRequest } from "../../../interface/employee";

const DataColumns = (
  handleUpdate: (record: EmployeeInfo) => void,
  handleDelete: (record: DeleteRequest) => void
) => {
  return [
    {
      title: "氏名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "所属課",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "入社時間",
      dataIndex: "hiredate",
      key: "hiredate",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: EmployeeInfo) => (
        <span>
          <Button
            size="small"
            // icon="edit"
            onClick={() => {
              handleUpdate(record);
            }}
          >
            編集
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title={`${record.name} を削除しますか？`}
            onConfirm={() => {
              handleDelete({ id: record.id });
            }}
          >
            <Button
              size="small"
              // icon="delete"
              danger
            >
              削除
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
};

export default DataColumns;
