import React, {useEffect, useState} from "react";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Tag,
  Tabs,
  Empty,
  Button,
  Avatar,
  Divider,
} from "antd";
import {
  UserOutlined,
  PrinterOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import "./HoSoBenhNhan.scss";

export default function HoSoBenhNhan() {
  const navigate = useNavigate();
  const [recordData, setRecordData] = useState(null);

  // Lấy dữ liệu từ localStorage khi load trang
  useEffect(() => {
    const savedData = localStorage.getItem("hoSoBenhNhanData");
    if (savedData) {
      setRecordData(JSON.parse(savedData));
    }
  }, []);

  if (!recordData) {
    return (
      <div className="empty-record">
        <Empty description="Chưa có dữ liệu hồ sơ. Vui lòng lưu hồ sơ từ trang Khám bệnh!" />
        <Button type="primary" onClick={() => navigate("/")} className="mt-16">
          Quay lại trang Điều trị
        </Button>
      </div>
    );
  }

  const {patient, medicalDetails} = recordData;

  return (
    <div className="ho-so-benh-nhan-wrapper">
      {/* HEADER */}
      <div className="hs-header">
        <div className="hs-title">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            type="text"
          />
          <h2>Hồ Sơ Bệnh Án Chi Tiết</h2>
        </div>
        <Button type="primary" icon={<PrinterOutlined />}>
          In Bệnh Án
        </Button>
      </div>

      <Row gutter={24} className="hs-content">
        {/* CỘT TRÁI: THÔNG TIN HÀNH CHÍNH (PROFILE) */}
        <Col span={7}>
          <Card className="profile-card" bordered={false}>
            <div className="profile-avatar">
              <Avatar
                size={100}
                icon={<UserOutlined />}
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              />
              <h3 className="patient-name">{patient.tenBN}</h3>
              <Tag color="blue" className="patient-code">
                {patient.maBN}
              </Tag>
            </div>
            <Divider />
            <div className="profile-info">
              <div className="info-row">
                <span>Giới tính:</span> <b>{patient.gioiTinh}</b>
              </div>
              <div className="info-row">
                <span>Ngày sinh:</span>{" "}
                <b>
                  {patient.ngaySinh} ({patient.tuoi} tuổi)
                </b>
              </div>
              <div className="info-row">
                <span>Số điện thoại:</span> <b>{patient.sdt}</b>
              </div>
              <div className="info-row">
                <span>Địa chỉ:</span> <b>{patient.diaChi}</b>
              </div>
            </div>
            <Divider />
            <div className="profile-info">
              <div className="info-row">
                <span>Loại thu phí:</span>{" "}
                <Tag color="green">{patient.loaiThuPhi}</Tag>
              </div>
              <div className="info-row">
                <span>Đối tượng BHYT:</span> <b>{patient.doiTuong}</b>
              </div>
              <div className="info-row">
                <span>Người thân:</span>{" "}
                <b>
                  {patient.hoTenNguoiThan} ({patient.nguoiThan})
                </b>
              </div>
              <div className="info-row">
                <span>SĐT Người thân:</span> <b>{patient.sdtNguoiThan}</b>
              </div>
            </div>
          </Card>
        </Col>

        {/* CỘT PHẢI: CHI TIẾT KHÁM BỆNH VÀ LÂM SÀNG */}
        <Col span={17}>
          <Card className="medical-card" bordered={false}>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: (
                    <span>
                      <FileTextOutlined /> Nội dung khám bệnh
                    </span>
                  ),
                  children: (
                    <div className="medical-details-tab">
                      {/* SINH HIỆU */}
                      <div className="section-block">
                        <h4 className="section-title">
                          <HeartOutlined /> Chỉ số sinh hiệu
                        </h4>
                        <Descriptions bordered size="small" column={4}>
                          <Descriptions.Item label="Mạch">
                            {medicalDetails.mach || "-"} nhịp/p
                          </Descriptions.Item>
                          <Descriptions.Item label="Nhiệt độ">
                            {medicalDetails.nhietDo || "-"} °C
                          </Descriptions.Item>
                          <Descriptions.Item label="Huyết áp">
                            {medicalDetails.huyetAp || "-"} mmHg
                          </Descriptions.Item>
                          <Descriptions.Item label="Nhịp thở">
                            {medicalDetails.nhipTho || "-"} lần/p
                          </Descriptions.Item>
                          <Descriptions.Item label="SpO2">
                            {medicalDetails.spo2 || "-"} %
                          </Descriptions.Item>
                          <Descriptions.Item label="Chiều cao">
                            {medicalDetails.chieuCao || "-"} cm
                          </Descriptions.Item>
                          <Descriptions.Item label="Cân nặng">
                            {medicalDetails.canNang || "-"} kg
                          </Descriptions.Item>
                          <Descriptions.Item label="BMI">
                            <Tag color="purple">
                              {medicalDetails.bmi || "-"}
                            </Tag>
                          </Descriptions.Item>
                        </Descriptions>
                      </div>

                      {/* HỎI BỆNH & TIỀN SỬ */}
                      <div className="section-block mt-24">
                        <h4 className="section-title">Hỏi bệnh & Tiền sử</h4>
                        <Row gutter={24}>
                          <Col span={12}>
                            <div className="info-box">
                              <span className="box-label">Lý do khám:</span>
                              <div className="box-value">
                                {medicalDetails.lyDoKham ||
                                  "Không có thông tin"}
                              </div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="info-box">
                              <span className="box-label">
                                Quá trình bệnh lý:
                              </span>
                              <div className="box-value">
                                {medicalDetails.quaTrinhBenh ||
                                  "Không có thông tin"}
                              </div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="info-box mt-16">
                              <span className="box-label">
                                Tiền sử bản thân:
                              </span>
                              <div className="box-value">
                                {medicalDetails.tienSuBanThan ||
                                  "Không có thông tin"}
                              </div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="info-box mt-16">
                              <span className="box-label">
                                Tiền sử gia đình:
                              </span>
                              <div className="box-value">
                                {medicalDetails.tienSuGiaDinh ||
                                  "Không có thông tin"}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* KHÁM LÂM SÀNG & CHẨN ĐOÁN */}
                      <div className="section-block mt-24">
                        <h4 className="section-title">
                          Khám Lâm Sàng & Chẩn Đoán
                        </h4>
                        <Row gutter={24}>
                          <Col span={12}>
                            <div className="info-box">
                              <span className="box-label">Khám toàn thân:</span>
                              <div className="box-value">
                                {medicalDetails.khamToanThan ||
                                  "Không có thông tin"}
                              </div>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="info-box">
                              <span className="box-label">
                                Khám các bộ phận:
                              </span>
                              <div className="box-value">
                                {medicalDetails.khamBoPhan ||
                                  "Không có thông tin"}
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <div className="diagnosis-box mt-16">
                          <span className="box-label">Chẩn đoán ban đầu:</span>
                          <div className="diagnosis-value">
                            {medicalDetails.chanDoan ? (
                              <Tag
                                color="red"
                                style={{fontSize: 14, padding: "4px 8px"}}
                              >
                                {medicalDetails.chanDoan}
                              </Tag>
                            ) : (
                              "Chưa có chẩn đoán"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: "Kết quả Cận lâm sàng",
                  children: <Empty description="Chưa có kết quả xét nghiệm" />,
                },
                {
                  key: "3",
                  label: "Toa thuốc & Chỉ định",
                  children: <Empty description="Chưa có toa thuốc" />,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
