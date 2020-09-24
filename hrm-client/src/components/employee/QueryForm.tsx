import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { FormItemProps } from "antd/lib/form";

import { get } from "../../utils/request";
import { GET_EMPLOYEE_URL } from "../../constants/urls";
import { EmployeeRequest, EmployeeResponse } from "../../interface/employee";

const { Option } = Select;

interface Props extends FormItemProps {
  onDataChange(data: EmployeeResponse): void;
}

const QueryFormHooks = (props: Props) => {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState<number | undefined>();

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleDepartmentChange = (value: number) => {
    setDepartmentId(value);
  };

  const handleSubmit = () => {
    queryEmployee({ name, departmentId });
  };

  const queryEmployee = (param: EmployeeRequest) => {
    get(GET_EMPLOYEE_URL, param).then((res) => {
      props.onDataChange(res.data);
    });
  };

  useEffect(() => {
    queryEmployee({ name, departmentId });
  });

  return (
    <>
      <Form layout="inline">
        <Form.Item>
          <Input
            placeholder="氏名"
            style={{ width: 200 }}
            allowClear
            value={name}
            onChange={handleNameChange}
          />
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="所属課"
            style={{ width: 200 }}
            allowClear
            value={departmentId}
            onChange={handleDepartmentChange}
          >
            <Option value={1}>技術部</Option>
            <Option value={2}>サポート事業部</Option>
            <Option value={3}>HRソリューション</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            検索
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default QueryFormHooks;
