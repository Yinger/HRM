import React from "react";
import { Checkbox, Button } from "antd";

import "./index.scss";

const Setting = () => {
  return (
    <>
      <Checkbox>新入社員をメールで共有</Checkbox>
      <div className="buttonWrap">
        <Button type="primary">保存</Button>
      </div>
    </>
  );
};

export default Setting;
