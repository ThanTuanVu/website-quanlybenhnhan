import React, { useState } from "react";
import { Row, Col, Input, DatePicker, Button, Table, Drawer } from "antd";
import {
  SearchOutlined,
  RightCircleOutlined,
  EyeOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./TiemChung.scss";

const { RangePicker } = DatePicker;

const tiemChungData = [
  {
    key: "1",
    tenVacXin: "Viêm gan B",
    mui: "1",
    ngayTiem: "01/01/2026 08:30",
    coSoTiem: "BV Phụ sản Hà Nội",
  },
  {
    key: "2",
    tenVacXin: "Lao",
    mui: "1",
    ngayTiem: "15/01/2026 08:30",
    coSoTiem: "BV Bạch Mai",
  },
];

export default function TiemChung() {
  // State quản lý Drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Hàm mở Drawer
  const handleOpenDrawer = (record) => {
    setSelectedRecord(record);
    setOpenDrawer(true);
  };

  // Hàm đóng Drawer
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedRecord(null);
  };

  const tiemChungColumns = [
    { title: "STT", dataIndex: "key", align: "center", width: 60 },
    { title: "Tên vắc xin", dataIndex: "tenVacXin", align: "center" },
    { title: "Mũi", dataIndex: "mui", align: "center" },
    { title: "Ngày tiêm", dataIndex: "ngayTiem", align: "center" },
    { title: "Cơ sở tiêm", dataIndex: "coSoTiem", align: "center" },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          style={{
            color: "#0000cc",
            borderColor: "#0000cc",
            fontWeight: 500,
            borderRadius: "4px",
          }}
          onClick={() => handleOpenDrawer(record)}
        >
          Xem
        </Button>
      ),
    },
  ];

  const renderDrawerRow = (label, value, required = false) => (
    <div className="drawer-info-row">
      <div className="drawer-label">
        {label}: {required && <span className="text-danger">*</span>}
      </div>
      <div className="drawer-value">{value || "........................"}</div>
    </div>
  );

  return (
    <div className="tiem-chung-wrapper">
      <div className="filter-box">
        <Row gutter={16}>
          <Col flex="auto">
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Nhập Tên vắc xin hoặc Cơ sở tiêm"
            />
          </Col>
          <Col>
            <RangePicker placeholder={["Chọn từ ngày", "Chọn đến ngày"]} />
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              style={{ backgroundColor: "#000080", borderRadius: "4px" }}
            />
          </Col>
        </Row>
      </div>

      <div className="table-box">
        <div className="table-header">
          <RightCircleOutlined style={{ marginRight: 8, fontSize: "16px" }} />
          <span>LỊCH SỬ TIÊM CHỦNG</span>
        </div>
        <Table
          columns={tiemChungColumns}
          dataSource={tiemChungData}
          pagination={false}
          bordered={false}
        />
      </div>

      <Drawer
        placement="right"
        closable={false}
        onClose={handleCloseDrawer}
        open={openDrawer}
        width={500}
        className="tiem-chung-drawer"
        title={
          <div className="drawer-custom-header">
            <LeftOutlined
              className="back-icon"
              onClick={handleCloseDrawer}
            />
            <span>Chi tiết mũi tiêm</span>
          </div>
        }
        footer={
          <div className="drawer-custom-footer">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleCloseDrawer}
              className="btn-close-drawer"
            >
              Đóng
            </Button>
          </div>
        }
      >
        <div className="drawer-body-content">
          {renderDrawerRow("Tên vắc xin", selectedRecord?.tenVacXin, true)}
          {renderDrawerRow("Mũi", selectedRecord?.mui)}
          {renderDrawerRow("Ngày tiêm", selectedRecord?.ngayTiem, true)}
          {renderDrawerRow("Số lô", null)}
          {renderDrawerRow("Liều lượng", null)}
          {renderDrawerRow("Cơ sở tiêm chủng", selectedRecord?.coSoTiem)}
          {renderDrawerRow("Phản ứng sau tiêm", null)}
          {renderDrawerRow("Dự kiến mũi tiếp theo", null)}
        </div>
      </Drawer>
    </div>
  );
}