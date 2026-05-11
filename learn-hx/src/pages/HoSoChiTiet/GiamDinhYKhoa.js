import React, {useState} from "react";
import {
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Table,
  Drawer,
  Checkbox,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./GiamDinhYKhoa.scss";

const {RangePicker} = DatePicker;

const giamDinhData = [
  {
    key: "1",
    ngayGiamDinh: "01/01/2026 08:30",
    hinhThuc: "Giám định thương tật",
    maDoiTuong: "GĐ-2026-001",
    cheDo: "BHYT 100%",
    noiDungDeNghi: "Giám định tỷ lệ thương tật do tai nạn giao thông",
    nguoiChuTri: "PGS.TS. Trần Văn A",
    chucVu: "Chủ tịch hội đồng",
    ngayHop: "05/01/2026",
    soBienBan: "BB-102/2026",
    vanBanCanCu: "QĐ 123/QĐ-BYT",
    coQuanGioiThieu: "Công an TP. Hà Nội",
    ketQuaKham:
      "Bệnh nhân gãy kín xương đùi phải, đã phẫu thuật đóng đinh tủy. Vận động hạn chế.",
    tyLeCu: "0%",
    tyLeMoi: "25%",
    tongTyLe: "25%",
    laNguoiKhuyetTat: false,
    dangKhuyetTat: "Không",
    mucDoKhuyetTat: "Không",
    ketLuan: "Đủ điều kiện hưởng chế độ thương tật",
    noiDungDeNghiKetLuan: "Cấp giấy chứng nhận thương tật 25%",
  },
  {
    key: "2",
    ngayGiamDinh: "15/01/2026 08:30",
    hinhThuc: "Giám định bệnh nghề nghiệp",
    maDoiTuong: "GĐ-2026-045",
    cheDo: "Bảo hiểm TNLĐ-BNN",
    noiDungDeNghi:
      "Giám định mức độ suy giảm khả năng lao động do bệnh bụi phổi",
    nguoiChuTri: "TS.BS. Lê Thị B",
    chucVu: "Phó chủ tịch hội đồng",
    ngayHop: "18/01/2026",
    soBienBan: "BB-105/2026",
    vanBanCanCu: "Luật ATVSLĐ 2015",
    coQuanGioiThieu: "Công ty Cổ phần Xây dựng X",
    ketQuaKham:
      "Tổn thương xơ hóa thùy trên hai phổi, chức năng hô hấp giảm nhẹ.",
    tyLeCu: "15%",
    tyLeMoi: "20%",
    tongTyLe: "35%",
    laNguoiKhuyetTat: true,
    dangKhuyetTat: "Khuyết tật khác",
    mucDoKhuyetTat: "Nhẹ",
    ketLuan: "Suy giảm 35% khả năng lao động",
    noiDungDeNghiKetLuan: "Giải quyết chế độ bệnh nghề nghiệp hàng tháng",
  },
];

export default function GiamDinhYKhoa() {
  // State quản lý Drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleOpenDrawer = (record) => {
    setSelectedRecord(record);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedRecord(null);
  };

  // Đưa columns vào trong để gọi hàm handleOpenDrawer
  const giamDinhColumns = [
    {title: "STT", dataIndex: "key", align: "center", width: 60},
    {title: "Ngày giám định", dataIndex: "ngayGiamDinh", align: "center"},
    {title: "Hình thức giám định", dataIndex: "hinhThuc", align: "center"},
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          style={{color: "#0000cc", borderColor: "#0000cc", fontWeight: 500}}
          onClick={() => handleOpenDrawer(record)}
        >
          Xem
        </Button>
      ),
    },
  ];

  // Hàm render các ô điền thông tin có gạch chân
  const renderField = (label, value, colSpan = 8) => (
    <Col span={colSpan}>
      <div className="drawer-field-label">{label}</div>
      <div className="drawer-field-value">
        {value || "........................"}
      </div>
    </Col>
  );

  return (
    <div className="giam-dinh-wrapper">
      {/* 1. Vùng thanh công cụ Filter */}
      <div className="filter-box">
        <Row gutter={16}>
          <Col flex="auto">
            <Select
              placeholder="Chọn Hình thức giám định"
              style={{width: "100%"}}
              options={[
                {value: "thuongtat", label: "Giám định thương tật"},
                {value: "benhnghenghiep", label: "Giám định bệnh nghề nghiệp"},
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
              style={{backgroundColor: "#000080", borderRadius: "4px"}}
            />
          </Col>
        </Row>
      </div>

      {/* 2. Bảng Danh sách */}
      <div className="table-box">
        <Table
          columns={giamDinhColumns}
          dataSource={giamDinhData}
          pagination={false}
          bordered={false}
        />
      </div>

      {/* 3. Drawer Chi tiết Giám định */}
      <Drawer
        placement="right"
        closable={false}
        onClose={handleCloseDrawer}
        open={openDrawer}
        width={800}
        className="giam-dinh-drawer"
        title={
          <div className="drawer-custom-header">
            <LeftOutlined className="back-icon" onClick={handleCloseDrawer} />
            <span>Chi tiết giám định y khoa</span>
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
        <div className="giam-dinh-drawer-body">
          {/* Phần 1 */}
          <h4 className="section-title">1. Thông tin định danh:</h4>
          <Row gutter={[32, 20]}>
            {renderField(
              "Mã đối tượng giám định",
              selectedRecord?.maDoiTuong,
              8,
            )}
            {renderField("Hình thức giám định", selectedRecord?.hinhThuc, 8)}
            {renderField("Chế độ đang hưởng", selectedRecord?.cheDo, 8)}
            {renderField(
              "Nội dung đề nghị giám định",
              selectedRecord?.noiDungDeNghi,
              24,
            )}
          </Row>

          {/* Phần 2 */}
          <h4 className="section-title mt-32">2. Thông tin hội đồng:</h4>
          <Row gutter={[32, 20]}>
            {renderField("Người chủ trì", selectedRecord?.nguoiChuTri, 8)}
            {renderField("Chức vụ", selectedRecord?.chucVu, 8)}
            {renderField("Ngày họp", selectedRecord?.ngayHop, 8)}

            {renderField("Số biên bản", selectedRecord?.soBienBan, 8)}
            {renderField("Văn bản căn cứ", selectedRecord?.vanBanCanCu, 8)}
            {renderField(
              "Cơ quan giới thiệu",
              selectedRecord?.coQuanGioiThieu,
              8,
            )}
          </Row>

          {/* Phần 3 */}
          <h4 className="section-title mt-32">3. Thông tin kết quả:</h4>
          <Row gutter={[32, 20]}>
            {renderField("Kết quả khám", selectedRecord?.ketQuaKham, 24)}

            {renderField("Tỷ lệ TTCT cũ", selectedRecord?.tyLeCu, 8)}
            {renderField("Tỷ lệ TTCT mới", selectedRecord?.tyLeMoi, 8)}
            {renderField("Tổng tỷ lệ TTCT", selectedRecord?.tongTyLe, 8)}

            <Col
              span={8}
              style={{
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: "6px",
              }}
            >
              <Checkbox
                checked={selectedRecord?.laNguoiKhuyetTat}
                disabled
                style={{color: "#333", fontWeight: 500}}
              >
                Người khuyết tật
              </Checkbox>
            </Col>
            {renderField("Dạng khuyết tật", selectedRecord?.dangKhuyetTat, 8)}
            {renderField(
              "Mức độ khuyết tật",
              selectedRecord?.mucDoKhuyetTat,
              8,
            )}
          </Row>

          {/* Phần 4 */}
          <h4 className="section-title mt-32">
            4. Thông tin kết luận & đề nghị:
          </h4>
          <Row gutter={[32, 20]}>
            {renderField("Kết luận cuối cùng", selectedRecord?.ketLuan, 12)}
            {renderField(
              "Nội dung đề nghị",
              selectedRecord?.noiDungDeNghiKetLuan,
              12,
            )}
          </Row>
        </div>
      </Drawer>
    </div>
  );
}
