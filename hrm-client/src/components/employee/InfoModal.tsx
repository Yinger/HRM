import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { FormProps } from "antd/lib/form";
import moment from "moment";

import {
  EmployeeInfo,
  CreateRequest,
  UpdateRequest,
} from "../../interface/employee";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

interface Props extends FormProps {
  visible: boolean;
  edit: boolean;
  rowData: Partial<EmployeeInfo>;
  hide(): void;
  createData(param: CreateRequest, callback: () => void): void;
  updateData(param: UpdateRequest, callback: () => void): void;
}

const WrapInfoModal = (
  props: Props
  // visible: boolean,
  // onCreate: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
  // onCancel: React.MouseEvent<HTMLElement, MouseEvent> | undefined
) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    form.validateFields().then(() => {
      // form.resetFields();
      setConfirmLoading(true);
      let param = form.getFieldsValue();
      console.log(param);
      param.hiredate = moment(param.hiredate, "YYYY-MM-DD");
      if (!props.edit) {
        props.createData(param as CreateRequest, close);
      } else {
        param.id = props.rowData.id;
        props.updateData(param as UpdateRequest, close);
      }
    });
  };

  const handleCancel = () => {
    close();
  };

  const close = () => {
    props.hide();
    setConfirmLoading(false);
  };

  let title = props.edit ? "編集" : "新しい社員を作成";
  let { name, departmentId, hiredate, levelId } = props.rowData;

  return (
    <Modal
      title={title}
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      destroyOnClose={true}
    >
      <Form form={form} {...layout}>
        <Form.Item
          label="氏名"
          name="name"
          initialValue={name}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "氏名を入力してください",
            },
          ]}
        >
          <Input
            placeholder="氏名"
            style={{ width: 200 }}
            maxLength={20}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="所属課"
          name="departmentId"
          initialValue={departmentId}
          rules={[{ required: true, message: "所属課を選択してください" }]}
        >
          <Select placeholder="所属課" style={{ width: 200 }} allowClear>
            <Option value={1}>技術部</Option>
            <Option value={2}>サポート事業部</Option>
            <Option value={3}>HRソリューション</Option>
            <Option value={4}>総務部</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="入社時間"
          name="hiredate"
          initialValue={hiredate ? moment(hiredate) : undefined}
          rules={[{ required: true, message: "入社時間を選択してください" }]}
        >
          <DatePicker placeholder="入社時間" style={{ width: 200 }} />
        </Form.Item>
        <Form.Item
          label="level"
          name="levelId"
          initialValue={levelId}
          rules={[{ required: true, message: "levelを選択してください" }]}
        >
          <Select placeholder="level" style={{ width: 200 }} allowClear>
            <Option value={1}>level-1</Option>
            <Option value={2}>level-2</Option>
            <Option value={3}>level-3</Option>
            <Option value={4}>level-4</Option>
            <Option value={5}>level-5</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WrapInfoModal;
