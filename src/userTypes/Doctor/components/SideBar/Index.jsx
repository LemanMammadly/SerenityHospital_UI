import React, { useState } from "react";
import {
  SettingOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  BuildOutlined,
  ApiOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
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
  getItem("Service", "3", <BuildOutlined />),
  getItem("Department", "4", <ApartmentOutlined />),
  getItem("Position", "5",<ApiOutlined />),
  getItem("Doctor", "6",< TeamOutlined />),
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav=useNavigate();



const ChangePage=(key)=>{
  if(key==="1")
  {
    nav("/doctor")
  }
  else if(key==="2")
  {
    nav("/superadmin/settings")
  }
  else if(key==="3")
  {
    nav("/superadmin/service")
  }
  else if(key==="4")
  {
    nav("/superadmin/department")
  }
  else if(key ==="5")
  {
    nav("/superadmin/position")
  }
  else if(key ==="6")
  {
    nav("/superadmin/doctor")
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