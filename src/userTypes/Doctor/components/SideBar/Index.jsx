import React, { useState } from "react";
import {
  ScheduleOutlined,
  PieChartOutlined,
  SolutionOutlined,
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
  getItem("Appoinments As Patient", "3", <SolutionOutlined />),
  getItem("Patients", "4", <TeamOutlined />),
  getItem("Recipes", "5",<FileTextOutlined />),
  getItem("Profile", "6",<UserOutlined />),
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
    nav("/doctor/appoinments")
  }
  else if(key==="3")
  {
    nav("/doctor/appoinmetsaspatient")
  }
  else if(key==="4")
  {
    nav("/doctor/doctorspatient")
  }
  else if(key==="5")
  {
    nav("/doctor/recipes")
  }
  else if(key==="6")
  {
    nav("/doctor/profile")
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