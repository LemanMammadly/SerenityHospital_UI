import React, { useState } from "react";
import {
  SettingOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  BuildOutlined,
  ApiOutlined,
  ScheduleOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  SelectOutlined,
  UserSwitchOutlined,
  HistoryOutlined,
  CarryOutOutlined,
  MailOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Index.css"

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
  getItem("Dashboard", "/superadmin", <PieChartOutlined />),
  getItem("Settings", "/superadmin/settings", <SettingOutlined />),
  getItem("Service", "/superadmin/service", <BuildOutlined />),
  getItem("Department", "/superadmin/department", <ApartmentOutlined />),
  getItem("Position", "/superadmin/position",<ApiOutlined />),
  getItem("Doctor","/superadmin/doctor",< TeamOutlined />),
  getItem("Doctor Busy", "/superadmin/doctoravailabe", <CarryOutOutlined />),
  getItem("Appoinments", "/superadmin/appoinments" ,< ScheduleOutlined />),
  getItem("Patients", "/superadmin/patients",<UsergroupAddOutlined />),
  getItem("Doctor Rooms", "/superadmin/doctorrooms",<SelectOutlined />),
  getItem("Patient Rooms", "/superadmin/patientrooms",<UserSwitchOutlined />),
  getItem("Receptionist", "/superadmin/nurse",<UserOutlined />),
  getItem("Patient History", "/superadmin/patienthistory",<HistoryOutlined />),
  getItem("Messages", "/superadmin/messages",<MailOutlined />),
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav=useNavigate();
  
  const handleMenuClick = (key) => {
    nav(key);
  };

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
      <div className="mx-4 my-3" style={{fontWeight:"bold",color:"#808DA1"}}><i class="fa-solid fa-unlock"></i> Admin Dashboard</div>
      <Menu
          selectedKeys={[window.location.pathname]}
          mode="inline"
          className="ant-menu-item.active"
        >
          {items.map((item) => (
            <Menu.Item
              className="menuItem"
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuClick(item.key)}
            >
              <Link className="link-sidebar" to={item.key}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
    </Sider>
  </Layout>
  );
};

export default Index;