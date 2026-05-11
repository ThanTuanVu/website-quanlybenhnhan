import React from "react";
import { Row, Col, Table } from "antd";
import { MedicineBoxOutlined, HeartOutlined, RightOutlined } from "@ant-design/icons";
import "./TienSu.scss";

export const TienSuTab = () => {
  const VitalItem = ({ label, value }) => (
    <div className="vital-item">
      <div className="vital-item__label">{label}</div>
      <div className="vital-item__value">{value}</div>
    </div>
  );

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", align: "center", width: 60 },
    { title: "Mã bệnh", dataIndex: "maBenh", key: "maBenh" },
    { title: "Tên bệnh", dataIndex: "tenBenh", key: "tenBenh" },
    { title: "Thời gian", dataIndex: "thoiGian", key: "thoiGian", align: "center" },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (text) => {
        let statusClass = "status-tag";
        if (text === "Ổn định") statusClass += " status-tag--stable";
        else if (text === "Đang điều trị") statusClass += " status-tag--treating";
        else if (text === "Đã hết bệnh") statusClass += " status-tag--recovered";
        return <span className={statusClass}>{text}</span>;
      },
    },
  ];

  const dataSource = [
    { key: "1", stt: 1, maBenh: "ICD- 10: I10", tenBenh: "Tiểu đường Type 2", thoiGian: "08/12/2024", trangThai: "Ổn định" },
    { key: "2", stt: 2, maBenh: "ICD -10: E11", tenBenh: "Tăng huyết áp", thoiGian: "09/10/2024", trangThai: "Đang điều trị" },
    { key: "3", stt: 3, maBenh: "ICD- 10: A15", tenBenh: "Lao phổi", thoiGian: "03/05/2018", trangThai: "Đã hết bệnh" },
  ];

  return (
    <div className="tien-su-wrapper">
      <div className="card-header">
        <div className="card-header__title">
          <MedicineBoxOutlined /> TIỀN SỬ BỆNH TẬT
        </div>
        <RightOutlined className="card-header__icon" />
      </div>

      <div className="content-body">
        <Row gutter={32}>
          <Col span={16}>
            <h4 className="section-title">Chỉ số sinh hiệu:</h4>
            <Row gutter={16}>
              <Col span={6}><VitalItem label="Mạch" value="82 Nhịp/phút" /></Col>
              <Col span={6}><VitalItem label="Nhịp thở" value="19 Lần/phút" /></Col>
              <Col span={6}><VitalItem label="SPO2" value="97 %" /></Col>
              <Col span={6}><VitalItem label="Cân nặng" value="72 kg" /></Col>
              <Col span={6}><VitalItem label="Nhiệt độ" value="36.6 °C" /></Col>
              <Col span={6}><VitalItem label="Huyết áp" value="130/85mmHg" /></Col>
              <Col span={6}><VitalItem label="Chiều cao" value="168 cm" /></Col>
              <Col span={6}><VitalItem label="BMI" value="25.5 kg/m²" /></Col>
            </Row>
          </Col>

          <Col span={8}>
            <div className="health-classification">
              <div className="health-classification__title">
                <HeartOutlined /> Phân loại sức khỏe
              </div>
              <div className="health-classification__divider" />
              <div className="health-classification__badge">LOẠI 2</div>
              <div className="health-classification__date">* Ngày khám: 31/03/2025</div>
            </div>
          </Col>
        </Row>

        <div style={{ marginTop: 24 }}>
          <h4 className="section-title">Bệnh mãn tính & Điều trị dài ngày:</h4>
          <Table 
            columns={columns} 
            dataSource={dataSource} 
            pagination={false} 
            bordered 
            size="middle"
            className="medical-table"
          />
        </div>
      </div>
    </div>
  );
};