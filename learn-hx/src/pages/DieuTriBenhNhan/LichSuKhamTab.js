import React from "react";
import {Row, Col, Tree, Table} from "antd";
import {DownOutlined} from "@ant-design/icons";
import "./LichSuKhamTab.scss";

export default function LichSuKhamTab() {

  const renderParentTitle = (date, facility) => (
    <div className="tree-parent-node">
      <div className="tree-date">{date}</div>
      <div className="tree-facility">{facility}</div>
    </div>
  );

  const treeData = [
    {
      title: renderParentTitle("16/04/24 - 16:30", "Cơ sở khám: CS 1"),
      key: "0-0",
      children: [
        {title: "P.015 Phòng tai mũi họng", key: "0-0-0"},
        {title: "P.012 Phòng tiết niệu", key: "0-0-1"},
        {title: "P.002 Phòng Sản", key: "0-0-2"},
      ],
    },
    {
      title: renderParentTitle("16/04/24 - 16:30", "Cơ sở khám: CS 2"),
      key: "0-1",
    },
    {
      title: renderParentTitle("16/04/24 - 16:30", "Cơ sở khám: CS 3"),
      key: "0-2",
    },
    {
      title: renderParentTitle("16/04/24 - 16:30", "Cơ sở khám: CS 4"),
      key: "0-3",
    },
  ];

  const columns = [
    {title: "STT", dataIndex: "stt", align: "center", width: 60},
    {title: "Tên thuốc", dataIndex: "tenThuoc"},
    {title: "Số lượng", dataIndex: "soLuong", align: "center"},
    {title: "Đơn vị tính", dataIndex: "dvt", align: "center"},
    {title: "Cách dùng", dataIndex: "cachDung"},
  ];

  const dataThuoc = [
    {
      key: "1",
      stt: 1,
      tenThuoc: "Panfor SR-500 500mg",
      soLuong: 6,
      dvt: "Viên",
      cachDung: "Ngày uống 2 lần, mỗi lần 1 viên sáng - chiều",
    },
    {
      key: "2",
      stt: 2,
      tenThuoc: "Panfor SR-500 500mg",
      soLuong: 6,
      dvt: "Viên",
      cachDung: "Ngày uống 2 lần, mỗi lần 1 viên sáng - chiều",
    },
    {
      key: "3",
      stt: 3,
      tenThuoc: "Panfor SR-500 500mg",
      soLuong: 6,
      dvt: "Viên",
      cachDung: "Ngày uống 2 lần, mỗi lần 1 viên sáng - chiều",
    },
    {
      key: "4",
      stt: 4,
      tenThuoc: "Panfor SR-500 500mg",
      soLuong: 6,
      dvt: "Viên",
      cachDung: "Ngày uống 2 lần, mỗi lần 1 viên sáng - chiều",
    },
  ];

  return (
    <div className="lich-su-kham-wrapper">
      <Row>
        {/* --- CỘT TRÁI: CÂY LỊCH SỬ --- */}
        <Col span={5} className="lsk-sidebar">
          <div className="lsk-sidebar-title">Ngày tiếp nhận</div>
          <Tree
            showIcon={false}
            defaultExpandAll
            defaultSelectedKeys={["0-0-0"]}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            className="lsk-tree"
          />
        </Col>

        {/* --- CỘT PHẢI: CHI TIẾT LỊCH SỬ --- */}
        <Col span={19} className="lsk-content">
          {/* HÀNG 1: Hỏi bệnh & Tiểu sử */}
          <Row gutter={48}>
            <Col span={12}>
              <h4 className="lsk-section-title">Hỏi bệnh</h4>
              <div className="info-row">
                <span className="label">Lý do khám:</span> Sốt cao, chóng mặt
                nhiều ngày
              </div>
              <div className="info-row">
                <span className="label">Quá trình bệnh lý:</span> Bắt đầu xuất
                hiện u nhú
              </div>
            </Col>
            <Col span={12}>
              <h4 className="lsk-section-title">Tiểu sử bệnh</h4>
              <div className="info-row">
                <span className="label">Bản thân:</span> Sốt cao, chóng mặt
                nhiều ngày
              </div>
              <div className="info-row">
                <span className="label">Gia đình:</span> Không có
              </div>
            </Col>
          </Row>

          {/* HÀNG 2: Khám bệnh & Chẩn đoán */}
          <Row gutter={48} className="mt-16">
            <Col span={12}>
              <h4 className="lsk-section-title">Khám bệnh</h4>
              <div className="info-row">
                <span className="label">Toàn thân:</span> Sốt cao, chóng mặt
                nhiều ngày
              </div>
              <div className="info-row">
                <span className="label">Các bộ phận:</span> Không có
              </div>
            </Col>
            <Col span={12}>
              <h4 className="lsk-section-title">Chẩn đoán cuối cùng</h4>
              <div className="info-row" style={{fontWeight: "bold"}}>
                Cao huyết áp (I01), Suy tim (I05)
              </div>
            </Col>
          </Row>

          {/* HÀNG 3: Chỉ định & Người phụ trách */}
          <Row gutter={48} className="mt-16">
            <Col span={12}>
              <h4 className="lsk-section-title">Các chỉ định</h4>
              <div className="info-row">
                <span className="label">Xét nghiệm:</span> Xét nghiệm nước tiểu,
                xét nghiệm máu
              </div>
              <div className="info-row">
                <span className="label">Thăm dò chức năng:</span> Điện tim não
              </div>
              <div className="info-row">
                <span className="label">Chẩn đoán hình ảnh:</span> X-Quang tim
              </div>
              <div className="info-row">
                <span className="label">Phẫu thuật thủ thuật:</span> Đặt ống nội
                khí quản
              </div>
            </Col>
            <Col span={12}>
              <h4 className="lsk-section-title">Người phụ trách</h4>
              <div className="info-row">
                <span className="label">Bác sĩ:</span> Nguyễn Tiến Anh
              </div>
            </Col>
          </Row>

          {/* HÀNG 4: Các Bảng Đơn Thuốc */}
          <div className="mt-24">
            <h4 className="lsk-section-title">Đơn thuốc BHYT</h4>
            <Table
              columns={columns}
              dataSource={dataThuoc}
              pagination={false}
              bordered
              size="small"
              className="custom-blue-table"
            />
          </div>

          <div className="mt-24">
            <h4 className="lsk-section-title">Đơn thuốc mua ngoài</h4>
            <Table
              columns={columns}
              dataSource={dataThuoc}
              pagination={false}
              bordered
              size="small"
              className="custom-blue-table"
            />
          </div>

          {/* HÀNG 5: Lời dặn */}
          <div className="mt-24 lsk-advice">
            <span className="advice-label">Lời dặn:</span>
            <span className="advice-content">
              Uống thuốc và tái khám đều đặn
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
