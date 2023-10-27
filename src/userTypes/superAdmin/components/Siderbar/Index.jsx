import React, { useState, useEffect } from "react";
import Home from "../../pages/Home/Index";
import Setting from "../../pages/Settings/Index";
import Service from "../../pages/Service/Index"
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
  getItem("Service", "3", <UserOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState("1");
  const [collapsed, setCollapsed] = useState(false);



const handleMenuItemClick = (key) => {
  setSelectedItem(key);
};


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
        onClick={({ key }) => handleMenuItemClick(key)}
        mode="inline"
        items={items}
      />
    </Sider>
    <Content style={{ padding: "24px", minHeight: 280 }}>
      {selectedItem === "1" && <Home />}
      {selectedItem === "2" && <Setting />}
      {selectedItem === "3" && <Service />}
    </Content>
  </Layout>
  );
};

export default Index;