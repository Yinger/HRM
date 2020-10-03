import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { FormProps } from "antd/lib/form";
import { EmployeeRequest, EmployeeResponse } from "../../../interface/employee";
import { get } from "../../../utils/request";
import { GET_EMPLOYEE_URL } from "../../../constants/urls";

const { Option } = Select;
interface Props extends FormProps {
  onDataChange(data: EmployeeResponse): void;
  // getData(param: EmployeeRequest, callback: () => void): void;
}

const QueryForm = (props: Props) => {
  const [name] = useState("");
  const [departmentId] = useState<number | undefined>();

  const queryEmployee = (param: EmployeeRequest) => {
    get(GET_EMPLOYEE_URL, param).then((res) => {
      props.onDataChange(res.data);
    });
  };

  useEffect(() => {
    queryEmployee({ name, departmentId });
  }, []);

  return (
    <Form layout="inline">
      <Form.Item>
        <Input placeholder="氏名" style={{ width: 200 }} value={name} />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="所属課"
          style={{ width: 200 }}
          allowClear
          value={departmentId}
        >
          <Option value={1}>技術部</Option>
          <Option value={2}>サポート事業部</Option>
          <Option value={3}>HRソリューション</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary">検索</Button>
      </Form.Item>
      <Form.Item>
        <Button>クリア</Button>
      </Form.Item>
    </Form>
  );
};
export default QueryForm;
