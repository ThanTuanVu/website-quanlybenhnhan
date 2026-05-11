import React, {useState, useMemo, useEffect} from "react";
import {
  Row,
  Col,
  Input,
  Table,
  Button,
  Modal,
  Tag,
  Space,
  DatePicker,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  PrinterOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import "./BenhNhanXuatVien.scss";

const {RangePicker} = DatePicker;

export default function BenhNhanXuatVien() {
  // --- STATES ---
  const [dataBenhNhanXuatVien, setDataBenhNhanXuatVien] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // --- HÀM LẤY DATA BỆNH NHÂN
  useEffect(() => {
    fetch("http://localhost:3000/dataBenhNhanXuatVien")
      .then((res) => res.json())
      .then((data) => {
        setDataBenhNhanXuatVien(data);
      });
  }, []);

  // --- HÀM XỬ LÝ LỌC TÌM KIẾM ---
  const filteredData = useMemo(() => {
    if (!searchText) return dataBenhNhanXuatVien;
    const lowerSearch = searchText.toLowerCase();
    return dataBenhNhanXuatVien.filter(
      (item) =>
        item.maBN.toLowerCase().includes(lowerSearch) ||
        item.tenBN.toLowerCase().includes(lowerSearch),
    );
  }, [searchText, dataBenhNhanXuatVien]);

  // --- HÀM XỬ LÝ MODAL ---
  const showPatientDetail = (patient) => {
    setSelectedPatient(patient);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPatient(null);
  };

  // --- CỘT CỦA BẢNG ---
  const columns = [
    {
      title: "Mã BN",
      dataIndex: "maBN",
      width: 100,
      align: "center",
      fontWeight: "bold",
    },
    {title: "Tên bệnh nhân", dataIndex: "tenBN"},
    {title: "Giới tính", dataIndex: "gioiTinh", width: 90, align: "center"},
    {
      title: "Ngày xuất viện",
      dataIndex: "ngayXuatVien",
      width: 130,
      align: "center",
    },
    {title: "Khoa điều trị", dataIndex: "khoa"},
    {
      title: "Tình trạng",
      dataIndex: "tinhTrangRaVien",
      align: "center",
      render: (status) => {
        let color = "blue";
        if (status === "Khỏi bệnh") color = "success";
        else if (status === "Ổn định") color = "processing";
        else if (status === "Đang phục hồi") color = "warning";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Tooltip title="Xem chi tiết hồ sơ">
          <Button
            type="primary"
            shape="circle"
            ghost
            icon={<EyeOutlined />}
            onClick={() => showPatientDetail(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="benh-nhan-xuat-vien-wrapper">
      {/* --- HEADER & FILTER --- */}
      <div className="page-header">
        <h2 className="page-title">
          <FileDoneOutlined /> Quản lý bệnh nhân xuất viện
        </h2>

        <div className="filter-container">
          <Space size="middle">
            <div>
              <span className="filter-label">Ngày xuất viện:</span>
              <RangePicker
                format="DD/MM/YYYY"
                placeholder={["Từ ngày", "Đến ngày"]}
              />
            </div>
            <div>
              <Input
                placeholder="Tìm kiếm mã BN, tên BN..."
                prefix={<SearchOutlined style={{color: "#bfbfbf"}} />}
                style={{width: 300}}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>
          </Space>
        </div>
      </div>

      {/* --- TABLE DANH SÁCH --- */}
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          bordered
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng số: ${total} bệnh nhân`,
          }}
          className="custom-blue-table"
        />
      </div>

      {/* --- MODAL CHI TIẾT BỆNH NHÂN XUẤT VIỆN --- */}
      <Modal
        title={<div className="modal-title">Chi tiết hồ sơ xuất viện</div>}
        open={isModalVisible}
        onCancel={closeModal}
        width={800}
        footer={[
          <Button key="print" icon={<PrinterOutlined />}>
            In giấy xuất viện
          </Button>,
          <Button key="close" type="primary" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedPatient && (
          <div className="detail-modal-body">
            {/* Header thông tin hành chính */}
            <div className="patient-basic-info">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <b>Mã BN:</b>{" "}
                  <span className="highlight-text">{selectedPatient.maBN}</span>
                </Col>
                <Col span={8}>
                  <b>Họ tên:</b> {selectedPatient.tenBN}
                </Col>
                <Col span={8}>
                  <b>Giới tính:</b> {selectedPatient.gioiTinh}
                </Col>
                <Col span={8}>
                  <b>Ngày sinh:</b> {selectedPatient.ngaySinh}
                </Col>
                <Col span={8}>
                  <b>Khoa:</b> {selectedPatient.khoa}
                </Col>
                <Col span={8}>
                  <b>Ngày ra viện:</b> {selectedPatient.ngayXuatVien}
                </Col>
              </Row>
            </div>

            {/* Nội dung chuyên môn */}
            <div className="medical-info-block">
              <div className="info-section">
                <div className="section-title">1. Lý do khám / Vào viện:</div>
                <div className="section-content">
                  {selectedPatient.lyDoKham}
                </div>
              </div>

              <div className="info-section">
                <div className="section-title">
                  2. Tình trạng và Kết quả TRƯỚC khi điều trị:
                </div>
                <div className="section-content">
                  {selectedPatient.ketQuaTruoc}
                </div>
              </div>

              <div className="info-section">
                <div className="section-title">
                  3. Tình trạng và Kết quả SAU khi điều trị / Xuất viện:
                </div>
                <div className="section-content">
                  {selectedPatient.ketQuaSau}
                </div>
              </div>

              <div className="info-section">
                <div className="section-title">
                  4. Tình trạng bệnh nhân khi ra viện:
                </div>
                <div className="section-content">
                  <Tag
                    color="processing"
                    style={{fontSize: 14, padding: "4px 8px"}}
                  >
                    {selectedPatient.tinhTrangRaVien}
                  </Tag>
                </div>
              </div>

              <div className="info-section">
                <div className="section-title">
                  5. Hướng dẫn theo dõi và chăm sóc:
                </div>
                <div className="section-content italic-text">
                  {selectedPatient.huongDanThem}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
