import React, { useState } from "react";
import { Row, Col, Input, Select, DatePicker, Button, Table } from "antd";
import {
  SearchOutlined,
  HistoryOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./LichSuKcb.scss"; 
import ChiTietKcb from "./ChiTietKcb";

const { RangePicker } = DatePicker;

const kcbData = [
  {
    key: "1",
    tenKham: "Viêm họng cấp",
    noiKcb: "Bệnh xá công an tỉnh Hà Nam",
    ngayVao: "01/01/2026 08:30",
    ngayRa: "01/01/2026 16:47",
    loaiKcb: "Ngoại trú",
  },
  {
    key: "2",
    tenKham: "Viêm dạ dày cấp tính có vi khuẩn HP (+)",
    noiKcb: "Bệnh viện 19-8",
    ngayVao: "15/01/2026 08:30",
    ngayRa: "18/01/2026 09:00",
    loaiKcb: "Nội trú",
  },
];

export default function LichSuKcb() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const kcbColumns = [
    // ... (Các cột khác giữ nguyên)
    { title: "STT", dataIndex: "key", align: "center", width: 60 },
    { title: "Tên khám", dataIndex: "tenKham" },
    { title: "Nơi KCB", dataIndex: "noiKcb" },
    {
      title: "Ngày vào viện",
      dataIndex: "ngayVao",
      align: "center",
      render: (text) => {
        const [date, time] = text.split(" ");
        return (
          <div>
            {date}
            <br />
            {time}
          </div>
        );
      },
    },
    {
      title: "Ngày ra viện",
      dataIndex: "ngayRa",
      align: "center",
      render: (text) => {
        const [date, time] = text.split(" ");
        return (
          <div>
            {date}
            <br />
            {time}
          </div>
        );
      },
    },
    { title: "Loại KCB", dataIndex: "loaiKcb", align: "center" },
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
          onClick={() => setSelectedRecord(record)}
        >
          Xem
        </Button>
      ),
    },
  ];

  if (selectedRecord) {
    return (
      <ChiTietKcb
        record={selectedRecord}
        onBack={() => setSelectedRecord(null)}
      />
    );
  }

  return (
    <div className="lich-su-kcb-wrapper">
      <div className="kcb-filter-box">
         <Row gutter={16}>
          <Col flex="auto">
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Nhập Tên khám hoặc Nơi KCB"
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

      <div className="kcb-table-box">
        <div className="kcb-table-header">
          <HistoryOutlined style={{ marginRight: 8, fontSize: "16px" }} />
          <span>LỊCH SỬ KHÁM CHỮA BỆNH THEO TỪNG ĐỢT KHÁM</span>
        </div>
        <Table
          columns={kcbColumns}
          dataSource={kcbData}
          pagination={false}
          bordered={false}
          style={{padding: "10px"}}
        />
      </div>
    </div>
  );
}