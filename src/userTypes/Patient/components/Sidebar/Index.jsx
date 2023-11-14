import React, { useState } from "react";
import {
  ScheduleOutlined,
  PieChartOutlined,
  FolderOpenOutlined,
  TeamOutlined,
  FileTextOutlined,
  UserOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Index.css";

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
  getItem("Dashboard", "/patient", <PieChartOutlined />),
  getItem("Appoinments", "/patient/appoinments", <ScheduleOutlined />),
  getItem("Recipes", "/patient/recipes", <FileTextOutlined />),
  getItem("Doctors", "/patient/doctors", <TeamOutlined />),
  getItem("Doctor Available", "/patient/doctoravailable", <CarryOutOutlined />),
  getItem("History", "/patient/history", <FolderOpenOutlined />),
  getItem("Profile", "/patient/profile", <UserOutlined />),
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();

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
        <div
          style={{ backgroundColor: "#fff" }}
          className="demo-logo-vertical"
        />
        <div
          className="mx-4 my-3"
          style={{ fontWeight: "bold", color: "#808DA1" }}
        >
          <i class="fa-solid fa-hospital-user"></i> Patient Dashboard
        </div>
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
              <Link className="link-sidebar" to={item.key}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Index;
