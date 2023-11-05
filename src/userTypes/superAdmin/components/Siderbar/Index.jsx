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
  HistoryOutlined
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
  getItem("Appoinments", "7",< ScheduleOutlined />),
  getItem("Patients", "8",<UsergroupAddOutlined />),
  getItem("Doctor Rooms", "9",<SelectOutlined />),
  getItem("Patient Rooms", "10",<UserSwitchOutlined />),
  getItem("Nurse", "11",<TeamOutlined />),
  getItem("Patient History", "12",<HistoryOutlined />),
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav=useNavigate();
  const [selectedKey, setSelectedKey] = useState("1"); 



const ChangePage=(key)=>{
  setSelectedKey(key);
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
  else if(key ==="7")
  {
    nav("/superadmin/appoinments")
  }
  else if(key ==="8")
  {
    nav("/superadmin/patients")
  }
  else if(key ==="9")
  {
    nav("/superadmin/doctorrooms")
  }
  else if(key ==="10")
  {
    nav("/superadmin/patientrooms")
  }
  else if(key ==="11")
  {
    nav("/superadmin/nurse")
  }
  else if(key ==="12")
  {
    nav("/superadmin/patienthistory")
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
      <div className="mx-4 my-3" style={{fontWeight:"bold",color:"#808DA1"}}><i class="fa-solid fa-unlock"></i> Admin Dashboard</div>
      <Menu
        theme="light"
        defaultSelectedKeys={selectedKey}
        onClick={(e) => ChangePage(e.key)}
        mode="inline"
        items={items}
      />
    </Sider>
  </Layout>
  );
};

export default Index;