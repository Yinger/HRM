import React from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Menu, ConfigProvider } from "antd";
import ja_JP from "antd/lib/locale-provider/ja_JP";

import Employee from "./employee";
import Setting from "./setting";

import "antd/dist/antd.css";
import "./App.scss";

const { Header, Content, Footer } = Layout;

const App = ({ match }: any) => {
  let defaultKey = match.url.replace("/", "") || "employee";
  return (
    <ConfigProvider locale={ja_JP}>
      <Layout className={"app"}>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[defaultKey]}
            className="menu"
          >
            <Menu.Item key="employee">
              <Link to="/employee">社員管理</Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="/setting">設定</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="contentWrap">
          <div className="content">
            <Route path="/" exact component={Employee} />
            <Route path="/employee" component={Employee} />
            <Route path="/setting" component={Setting} />
          </div>
        </Content>
        <Footer className="footer">footer</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
