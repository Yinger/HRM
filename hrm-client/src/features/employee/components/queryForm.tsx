import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;
const QueryForm = () => {
  const [name] = useState("");
  const [departmentId] = useState<number | undefined>();

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
