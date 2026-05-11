import { Layout, Breadcrumb, Dropdown, Avatar } from "antd";
import "./layoutdefault.scss";
import logo from "../../image/logo.png";
import logoFold from "../../image/logo-fold.png";
import flagVN from "../../image/Flag_of_Vietnam.png";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import MenuSider from "../../components/MenuSider";
import { Outlet, useNavigate, useMatches } from "react-router-dom";

const { Sider, Content } = Layout;

function LayoutDefault() {
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();
  const matches = useMatches();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userMenu = [
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ];

  const breadcrumbItems = matches
    .map((match) => match.handle?.breadcrumb)
    .filter(Boolean)
    .map((item) => ({
      title: item,
    }));

  return (
    <>
      <Layout className="layout-default">
        <header className="header">
          <div
            className={"header__logo " + (collapse && "header__logo--collapse")}
          >
            <img src={collapse ? logoFold : logo} alt="logo" />
          </div>
          <div className="header__nav">
            <div className="header__nav-left">
              <div
                className="header__collapse"
                onClick={() => setCollapse(!collapse)}
              >
                <MenuUnfoldOutlined />
              </div>
              <div className="header__breadcrumb">
                <Breadcrumb items={breadcrumbItems} style={{ marginLeft: 16 }} />
              </div>
            </div>
            
            <div className="header__nav-right">
              <p>Thân Tuấn Vũ</p>
              <img src={flagVN} alt="cờ việt nam" />
              
              <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
                <Avatar 
                  className="header__avatar" 
                  icon={<UserOutlined />} 
                />
              </Dropdown>
            </div>
          </div>
        </header>
        <Layout>
          <Sider className="sider" collapsed={collapse} theme="light">
            <MenuSider />
          </Sider>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutDefault;