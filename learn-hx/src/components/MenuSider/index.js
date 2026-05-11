import {Menu, Input} from "antd";
import {
  ContactsOutlined,
  LineChartOutlined,
  ReconciliationOutlined,
  SearchOutlined,
  PrinterOutlined
} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import "./MenuSider.css";

function MenuSider() {
  const location = useLocation();
  const items = [
    {
      key: "search",
      label: (
        <Input
          className="search-sider"
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
        />
      ),
    },
    {
      label: <Link to="ho-so-suc-khoe">Hồ Sơ Sức Khỏe</Link>,
      icon: <ReconciliationOutlined />,
      key: "/ho-so-suc-khoe",
    },
    {
      label: <Link to="dieu-tri-benh-nhan">Điều Trị Bệnh Nhân</Link>,
      icon: <ContactsOutlined />,
      key: "/dieu-tri-benh-nhan",
    },
    {
      label: <Link to="benh-nhan-xuat-vien">Bệnh Nhân Xuất Viện</Link>,
      icon: <PrinterOutlined />,
      key: "/benh-nhan-xuat-vien",
    },
    {
      label: <Link to="ho-so-benh-an" >Hồ Sơ Bệnh Án</Link>,
      icon: <PrinterOutlined />,
      key: "/ho-so-benh-an",
    },
    {
      label: <Link to="ho-so-benh-nhan" >Hồ Sơ Bệnh Nhân</Link>,
      icon: <ContactsOutlined />,
      key: "/ho-so-benh-nhan",
    },
    {
      label: <Link to="them-benh-nhan" >Thêm Bệnh Nhân</Link>,
      icon: <ReconciliationOutlined />,
      key: "/them-benh-nhan",
    },
    {
      label: <Link to="/doanh-thu">Doanh Thu</Link>,
      icon: <LineChartOutlined />,
      key: "/doanh-thu",
    },
  ];
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={[location.pathname]}
      />
    </>
  );
}

export default MenuSider;
