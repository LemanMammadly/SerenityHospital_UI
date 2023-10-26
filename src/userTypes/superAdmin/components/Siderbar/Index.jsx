import React, { useState, useEffect } from "react";
import Home from "../../pages/Home/Index";
import Setting from "../../pages/Settings/Index";
import {
  SettingOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Content } from "antd/es/layout/layout";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Settings", "2", <SettingOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState("1");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
  }, [selectedItem]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
    <Sider
      width={240} // Sabit genişliği ayarlayın
      style={{ backgroundColor: "#fff" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ backgroundColor: "#fff" }} className="demo-logo-vertical" />
      <Menu
        theme="light"
        selectedKeys={[selectedItem]}
        onClick={(e) => setSelectedItem(e.key)}
        mode="inline"
        items={items}
      />
    </Sider>
    <Content style={{ padding: "24px", minHeight: 280 }}>
      {selectedItem === "1" && <Home />}
      {selectedItem === "2" && <Setting />}
    </Content>
  </Layout>
  );
};

export default Index;