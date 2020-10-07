import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { FormProps } from "antd/lib/form";
import { EmployeeRequest, EmployeeResponse } from "../../../interface/employee";
import { get } from "../../../utils/request";
import { GET_EMPLOYEE_URL, GET_DEPARTMENT_URL } from "../../../constants/urls";
import { Department } from "../../../interface/department";

const { Option } = Select;
interface Props extends FormProps {
  onDataChange(data: EmployeeResponse): void;
  getData(param: EmployeeRequest, callback: () => void): void;
  setLoading(loading: boolean): void;
}

const QueryForm = (props: Props) => {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState<number | undefined>();
  const [departmentList, setDepartmentList] = useState<[]>();

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleDepartmentChange = (value: number) => {
    setDepartmentId(value);
  };

  const queryEmployee = (param: EmployeeRequest) => {
    get(GET_EMPLOYEE_URL, param).then((res) => {
      // console.log(res.data);
      props.onDataChange(res.data);
    });
  };

  const setDepartmentSelectOptions = (param: any) => {
    get(GET_DEPARTMENT_URL, param).then((res) => {
      setDepartmentList(res.data);
    });
  };

  const handleReset = () => {
    setName("");
    setDepartmentId(undefined);
    queryEmployee({ name: "", departmentId: undefined } as EmployeeRequest);
  };

  const handleSubmit = () => {
    queryEmployee({ name, departmentId });
  };

  useEffect(() => {
    queryEmployee({ name, departmentId });
    setDepartmentSelectOptions({});
  }, []);

  return (
    <Form layout="inline">
      <Form.Item>
        <Input
          placeholder="氏名"
          style={{ width: 200 }}
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
          {departmentList !== undefined
            ? departmentList.map((dep: Department) => (
                <Option key={dep.id} value={dep.id}>
                  {dep.department}
                </Option>
              ))
            : ""}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          検索
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleReset}>クリア</Button>
      </Form.Item>
    </Form>
  );
};
export default QueryForm;
