import React, { useState } from "react";
import {
  ScheduleOutlined,
  PieChartOutlined,
  FolderOpenOutlined,
  TeamOutlined,
  FileTextOutlined,
  UserOutlined
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
  getItem("Appoinments", "2", <ScheduleOutlined  />),
  getItem("Recipes", "3",<FileTextOutlined />),
  getItem("Doctors", "4", <TeamOutlined />),
  getItem("History", "5", <FolderOpenOutlined />),
  getItem("Profile", "6",<UserOutlined />),
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav=useNavigate();

const ChangePage=(key)=>{
  if(key==="1")
  {
    nav("/patient")
  }
  if(key==="2")
  {
    nav("/patient/appoinments")
  }
  if(key==="3")
  {
    nav("/patient/recipes")
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
      <div className="mx-4 my-3" style={{fontWeight:"bold",color:"#808DA1"}}><i class="fa-solid fa-hospital-user"></i> Patient Dashboard</div>
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