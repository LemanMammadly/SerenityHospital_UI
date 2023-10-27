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
import { useNavigate } from "react-router-dom";

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
  const [collapsed, setCollapsed] = useState(false);
  const nav=useNavigate();



const ChangePage=(key)=>{
  if(key==="1")
  {
    nav("/superadmin")
  }
  else if(key==="2")
  {
    nav("/superadmin/settings")
  }
  else if(key==="3")
  {
    nav("/superadmin/service")
  }
}

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
    <Sider
      width={240}
      style={{ backgroundColor: "#fff" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ backgroundColor: "#fff" }} className="demo-logo-vertical" />
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        onClick={(e) => ChangePage(e.key)}
        mode="inline"
        items={items}
      />
    </Sider>
  </Layout>
  );
};

export default Index;