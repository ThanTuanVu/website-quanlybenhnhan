import React, { useState, useMemo, useEffect } from "react";
import { 
  Row, Col, Input, Table, Button, Modal, Tag, Space, DatePicker, Timeline, Card 
} from "antd";
import { 
  SearchOutlined, 
  EyeOutlined, 
  FolderOpenOutlined,
  HistoryOutlined,
  UserOutlined
} from "@ant-design/icons";
import "./HoSoBenhAn.scss";

const { RangePicker } = DatePicker;


export default function HoSoBenhAn() {
  const [dataHoSoBenhAn, setDataHoSoBenhAn] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/dataHoSoBenhAn")
      .then((res) => res.json())
      .then(data => {
        setDataHoSoBenhAn(data)
      })
  })

  // Lọc tìm kiếm
  const filteredData = useMemo(() => {
    const lowerSearch = searchText.toLowerCase();
    return dataHoSoBenhAn.filter(item => 
      item.maBN.toLowerCase().includes(lowerSearch) || 
      item.tenBN.toLowerCase().includes(lowerSearch)
    );
  }, [searchText, dataHoSoBenhAn]);

  const showDetail = (record) => {
    setSelectedProfile(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Mã hồ sơ", dataIndex: "maBN", width: 150, align: "center", render: (text) => <b>{text}</b> },
    { title: "Họ và tên", dataIndex: "tenBN" },
    { title: "Giới tính", dataIndex: "gioiTinh", width: 100, align: "center" },
    { title: "Ngày sinh", dataIndex: "ngaySinh", width: 120, align: "center" },
    { title: "Ngày lập hồ sơ", dataIndex: "ngayLapHoSo", width: 150, align: "center" },
    { title: "Số lần khám", dataIndex: "lichSuKham", width: 120, align: "center", render: (list) => <Tag color="blue">{list.length} lần</Tag> },
    {
      title: "Xem",
      key: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Button 
          type="primary" 
          shape="circle" 
          icon={<EyeOutlined />} 
          onClick={() => showDetail(record)} 
        />
      ),
    },
  ];

  return (
    <div className="ho-so-benh-an-wrapper">
      <div className="page-header">
        <h2 className="page-title"><FolderOpenOutlined /> Quản lý Hồ sơ bệnh án</h2>
        <Space size="large">
          <RangePicker placeholder={["Hồ sơ từ ngày", "Đến ngày"]} />
          <Input
            placeholder="Tìm mã BN hoặc tên BN..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Space>
      </div>

      <div className="table-container">
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id" 
          bordered 
          pagination={{ pageSize: 10 }}
          className="custom-blue-table"
        />
      </div>

      {/* MODAL CHI TIẾT TOÀN BỘ LỊCH SỬ BỆNH ÁN */}
      <Modal
        title={<b><HistoryOutlined /> TIẾN TRÌNH BỆNH ÁN CHI TIẾT</b>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={900}
        footer={[<Button key="close" type="primary" onClick={() => setIsModalVisible(false)}>Đóng</Button>]}
      >
        {selectedProfile && (
          <div className="hoso-detail-body">
            {/* Header Thông tin bệnh nhân */}
            <div className="patient-header-box">
              <Row gutter={24}>
                <Col span={4}>
                  <div className="avatar-placeholder"><UserOutlined /></div>
                </Col>
                <Col span={20}>
                  <Row gutter={[16, 8]}>
                    <Col span={12}><b>Mã bệnh nhân:</b> <span className="text-blue">{selectedProfile.maBN}</span></Col>
                    <Col span={12}><b>Họ và tên:</b> {selectedProfile.tenBN}</Col>
                    <Col span={12}><b>Ngày sinh:</b> {selectedProfile.ngaySinh}</Col>
                    <Col span={12}><b>Giới tính:</b> {selectedProfile.gioiTinh}</Col>
                  </Row>
                </Col>
              </Row>
            </div>

            {/* Timeline lịch sử khám */}
            <div className="history-timeline-section">
              <h4 className="sub-title">Lịch sử điều trị (Từ mới nhất đến cũ nhất)</h4>
              <Timeline mode="left" className="custom-timeline">
                {selectedProfile.lichSuKham.map((visit, index) => (
                  <Timeline.Item 
                    key={index} 
                    label={<b className="text-blue">{visit.ngayKham}</b>}
                    color={index === 0 ? "green" : "blue"}
                  >
                    <Card size="small" className="visit-card" title={<b>Khoa: {visit.khoa}</b>}>
                      <Row gutter={[16, 8]}>
                        <Col span={24}>
                          <div className="field-item">
                            <span className="field-label">Lý do khám:</span> {visit.lyDo}
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="field-item box-gray">
                            <span className="field-label-bold">Chẩn đoán/Tình trạng TRƯỚC:</span>
                            <div className="field-content">{visit.chanDoanTruoc}</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="field-item box-blue">
                            <span className="field-label-bold">Kết quả/Tình trạng SAU:</span>
                            <div className="field-content">{visit.ketQuaSau}</div>
                          </div>
                        </Col>
                        <Col span={24}>
                          <div className="field-item">
                            <span className="field-label">Hướng xử trí:</span> {visit.xuTri}
                          </div>
                        </Col>
                        <Col span={24}>
                          <span className="field-label">Tình trạng ra viện:</span> <Tag color="cyan">{visit.tinhTrang}</Tag>
                        </Col>
                      </Row>
                    </Card>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}