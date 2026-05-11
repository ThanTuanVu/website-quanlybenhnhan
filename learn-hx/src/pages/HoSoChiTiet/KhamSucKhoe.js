import React from "react";
import { Row, Col, Input, Select, DatePicker, Button, Table } from "antd";
import {
  SearchOutlined,
  HistoryOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./KhamSucKhoe.scss"; // Import file style tương ứng

const { RangePicker } = DatePicker;

// --- Định nghĩa cột cho bảng Khám Sức Khỏe ---
const khamSucKhoeColumns = [
  { title: "STT", dataIndex: "key", align: "center", width: 60 },
  { title: "Ngày khám", dataIndex: "ngayKham", align: "center" },
  { title: "Loại khám", dataIndex: "loaiKham", align: "center" },
  { title: "Đơn vị khám", dataIndex: "donViKham", align: "center" },
  { title: "Loại sức khỏe", dataIndex: "loaiSucKhoe", align: "center" },
  {
    title: "Thao tác",
    key: "action",
    align: "center",
    render: () => (
      <Button
        size="small"
        icon={<EyeOutlined />}
        style={{
          color: "#0000cc", // Màu xanh khớp với thiết kế
          borderColor: "#0000cc",
          fontWeight: 500,
          borderRadius: "4px",
        }}
      >
        Xem
      </Button>
    ),
  },
];

// --- Dữ liệu mẫu dựa theo ảnh ---
const khamSucKhoeData = [
  {
    key: "1",
    ngayKham: "01/01/2026 08:30",
    loaiKham: "..........",
    donViKham: "..........",
    loaiSucKhoe: ".....",
  },
  {
    key: "2",
    ngayKham: "15/01/2026 08:30",
    loaiKham: "..........",
    donViKham: "..........",
    loaiSucKhoe: ".....",
  },
];

export default function KhamSucKhoe() {
  return (
    <div className="kham-suc-khoe-wrapper">
      {/* 1. Vùng thanh công cụ Filter */}
      <div className="filter-box">
        <Row gutter={16}>
          <Col flex="auto">
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Nhập ...."
            />
          </Col>
          <Col>
            <Select
              placeholder="Chọn loại KCB"
              style={{ width: 160 }}
              options={[
                { value: "ngoaitru", label: "Ngoại trú" },
                { value: "noitru", label: "Nội trú" },
              ]}
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

      {/* 2. Bảng Danh sách Khám Sức Khỏe */}
      <div className="table-box">
        <div className="table-header">
          <HistoryOutlined style={{ marginRight: 8, fontSize: "16px" }} />
          <span>KHÁM SỨC KHỎE</span>
        </div>
        <Table
          columns={khamSucKhoeColumns}
          dataSource={khamSucKhoeData}
          pagination={false}
          bordered={false}
        />
      </div>
    </div>
  );
}