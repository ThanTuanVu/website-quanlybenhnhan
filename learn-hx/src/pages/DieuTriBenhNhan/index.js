import React, {useState, useMemo, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  Collapse,
  Tabs,
  Radio,
  Modal,
  message,
} from "antd";
import {
  SettingOutlined,
  LinkOutlined,
  CalendarOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SaveOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import KhamBenhTab from "./KhamBenhTab";
import ChiDinhTab from "./ChiDinhTab";
import ToaThuocTab from "./ToaThuocTab";
import LichSuKhamTab from "./LichSuKhamTab";
import "./index.scss";

const {Panel} = Collapse;
const {TextArea} = Input;

export default function DieuTriBenhNhan() {
  const navigate = useNavigate();
  // --- STATE TỔNG ---
  const [activeMainTab, setActiveMainTab] = useState("2");
  const [activeSubTab, setActiveSubTab] = useState("tatca");
  // STATE TÌM KIẾM
  const [searchText, setSearchText] = useState("");
  const [dataBenhNhan, setDataBenhNhan] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // 1. State lưu trữ dữ liệu Tái khám
  const [reExamForm, setReExamForm] = useState({
    date: null,
    session: "sang",
    room: "P015.Tai mũi họng",
    content: "",
  });
  const [savedReExamData, setSavedReExamData] = useState(null);

  // 2. Hàm xử lý khi ấn Lưu trong Modal
  const handleSaveReExamModal = () => {
    setSavedReExamData(reExamForm);
    setIsReExamModalOpen(false);
  };

  // 3. Hàm xử lý khi click con thùng rác để xóa tái khám
  const handleDeleteReExam = () => {
    setSavedReExamData(null);
  };

  // DỮ LIỆU DANH SÁCH BỆNH NHÂN
  useEffect(() => {
    fetch("http://localhost:3000/dataBenhNhan")
      .then((res) => res.json())
      .then((data) => {
        setDataBenhNhan(data);
        if (data && data.length > 0) {
          setSelectedPatient(data[0]);
        }
      });
  }, []);

  // HÀM XỬ LÝ LƯU THÔNG TIN VÀ CHUYỂN SANG TRANG HỒ SƠ
  const handleSaveToHoSo = () => {
    if (!selectedPatient) {
      message.error("Vui lòng chọn bệnh nhân trước khi lưu!");
      return;
    }

    const recordToSave = {
      patient: selectedPatient,
      medicalDetails: {
        mach: "85",
        nhietDo: "37.5",
        huyetAp: "120/80",
        nhipTho: "18",
        spo2: "98",
        chieuCao: "170",
        canNang: "65",
        bmi: "22.5",
        lyDoKham: "Sốt cao, đau đầu, chóng mặt 2 ngày nay.",
        quaTrinhBenh:
          "Bệnh nhân sốt tại nhà uống Paracetamol không đỡ, mệt mỏi nhiều.",
        tienSuBanThan: "Viêm dạ dày, Không dị ứng thuốc.",
        tienSuGiaDinh: "Khỏe mạnh, không có bệnh lý di truyền.",
        khamToanThan:
          "Bệnh nhân tỉnh, tiếp xúc tốt. Da niêm mạc hồng. Tuyến giáp không to.",
        khamBoPhan: "Tim nhịp đều, Phổi không rale, Bụng mềm.",
        chanDoan: "Sốt siêu vi / Theo dõi Sốt xuất huyết Dengue",
      },
    };

    // Lưu vào localStorage
    localStorage.setItem("hoSoBenhNhanData", JSON.stringify(recordToSave));
    message.success("Đã lưu hồ sơ khám bệnh!");
    navigate("/ho-so-benh-nhan");
  };

  // --- STATE MODAL TÁI KHÁM ---
  const [isReExamModalOpen, setIsReExamModalOpen] = useState(false);
  const showReExamModal = () => setIsReExamModalOpen(true);
  const handleCancelReExamModal = () => setIsReExamModalOpen(false);

  // --- XỬ LÝ SỐ LIỆU ĐỘNG ---
  const countTatCa = dataBenhNhan.length;
  const countChoKham = dataBenhNhan.filter(
    (item) => item.trangThai === "Chờ khám",
  ).length;
  const countDangKham = dataBenhNhan.filter(
    (item) => item.trangThai === "Đang khám",
  ).length;
  const countHoanThanh = dataBenhNhan.filter(
    (item) => item.trangThai === "Hoàn thành",
  ).length;

  const filtereddataBenhNhan = useMemo(() => {
    let data = dataBenhNhan;
    if (activeSubTab === "chokham") {
      data = data.filter((item) => item.trangThai === "Chờ khám");
    } else if (activeSubTab === "dangkham") {
      data = data.filter((item) => item.trangThai === "Đang khám");
    } else if (activeSubTab === "hoanthanh") {
      data = data.filter((item) => item.trangThai === "Hoàn thành");
    }
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      data = data.filter(
        (item) =>
          item.maBN?.toLowerCase().includes(lowerCaseSearch) ||
          item.tenBN?.toLowerCase().includes(lowerCaseSearch),
      );
    }
    return data;
  }, [activeSubTab, dataBenhNhan, searchText]);

  const columns = [
    {title: "STT", dataIndex: "stt", align: "center", width: 60},
    {title: "Mã bệnh nhân", dataIndex: "maBN"},
    {title: "Tên bệnh nhân", dataIndex: "tenBN"},
    {title: "Giới tính", dataIndex: "gioiTinh", align: "center"},
    {title: "Ngày sinh", dataIndex: "ngaySinh", align: "center"},
    {title: "Tên dịch vụ", dataIndex: "dichVu"},
    {title: "Ngày khám", dataIndex: "ngayKham", align: "center"},
    {title: "Loại ưu tiên", dataIndex: "uuTien", align: "center"},
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      render: (status) => {
        let bgColor = "",
          color = "";
        if (status === "Chờ khám") {
          bgColor = "#e6f0ff";
          color = "#1890ff";
        } else if (status === "Đang khám") {
          bgColor = "#fff7e6";
          color = "#fa8c16";
        } else if (status === "Hoàn thành") {
          bgColor = "#f6ffed";
          color = "#52c41a";
        }
        return (
          <span
            style={{
              backgroundColor: bgColor,
              color: color,
              padding: "4px 12px",
              borderRadius: "20px",
              fontWeight: 500,
              fontSize: "13px",
              whiteSpace: "nowrap",
            }}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const renderInfoItem = (label, value) => (
    <div className="info-item">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value || "---"}</span>
    </div>
  );

  const khamBenhInnerTabs = [
    {key: "1", label: "Khám bệnh", children: <KhamBenhTab />},
    {key: "2", label: "Chỉ định", children: <ChiDinhTab />},
    {
      key: "3",
      label: "Toa thuốc",
      children: (
        <ToaThuocTab
          onShowReExamModal={showReExamModal}
          savedReExamData={savedReExamData}
          onDeleteReExam={handleDeleteReExam}
        />
      ),
    },
    {key: "4", label: "Lịch sử khám", children: <LichSuKhamTab />},
  ];

  return (
    <div className="dieu-tri-benh-nhan-wrapper">
      <div className="main-tabs-container">
        <div
          className={`main-tab ${activeMainTab === "1" ? "active" : ""}`}
          onClick={() => setActiveMainTab("1")}
        >
          Danh sách bệnh nhân
        </div>
        <div
          className={`main-tab ${activeMainTab === "2" ? "active" : ""}`}
          onClick={() => setActiveMainTab("2")}
        >
          Khám bệnh
        </div>
      </div>

      <div className="main-content">
        {activeMainTab === "1" ? (
          <>
            <div className="filter-section">
              <Row justify="space-between" align="bottom">
                <Col>
                  <Row gutter={16}>
                    <Col>
                      <div className="filter-label">Phòng</div>
                      <Select placeholder="example" style={{width: 200}} />
                    </Col>
                    <Col>
                      <div className="filter-label">Ngày khám</div>
                      <DatePicker placeholder="example" style={{width: 200}} />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <div style={{display: "flex", gap: "8px"}}>
                    <Input
                      placeholder="Tìm kiếm tên và mã bệnh nhân..."
                      style={{width: 300}}
                      allowClear
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button icon={<SettingOutlined />} />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="patient-info-section">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header={
                    <div className="custom-collapse-header">
                      <span className="title">Thông tin bệnh nhân</span>
                      <span className="detail-text">Thông tin chi tiết</span>
                    </div>
                  }
                  key="1"
                >
                  <Row gutter={[32, 16]}>
                    <Col span={8}>
                      {renderInfoItem("Mã bệnh nhân", selectedPatient?.maBN)}
                      {renderInfoItem("Tuổi", selectedPatient?.tuoi)}
                      {renderInfoItem("Ngày sinh", selectedPatient?.ngaySinh)}
                      {renderInfoItem("Số điện thoại", selectedPatient?.sdt)}
                    </Col>
                    <Col span={8}>
                      {renderInfoItem("Họ tên", selectedPatient?.tenBN)}
                      {renderInfoItem(
                        "Loại thu phí",
                        selectedPatient?.loaiThuPhi,
                      )}
                      {renderInfoItem("Đối tượng", selectedPatient?.doiTuong)}
                      {renderInfoItem("Địa chỉ", selectedPatient?.diaChi)}
                    </Col>
                    <Col span={8}>
                      {renderInfoItem("Giới tính", selectedPatient?.gioiTinh)}
                      {renderInfoItem("Người thân", selectedPatient?.nguoiThan)}
                      {renderInfoItem(
                        "Họ tên người thân",
                        selectedPatient?.hoTenNguoiThan,
                      )}
                      {renderInfoItem(
                        "Số điện thoại người thân",
                        selectedPatient?.sdtNguoiThan,
                      )}
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </div>

            <div className="sub-tabs-container">
              <Tabs
                activeKey={activeSubTab}
                onChange={(key) => setActiveSubTab(key)}
                type="card"
                className="status-tabs"
                items={[
                  {key: "tatca", label: `Tất cả (${countTatCa})`},
                  {key: "chokham", label: `Chờ khám (${countChoKham})`},
                  {key: "dangkham", label: `Đang khám (${countDangKham})`},
                  {key: "hoanthanh", label: `Hoàn thành (${countHoanThanh})`},
                ]}
              />
            </div>

            <div className="table-section">
              <Table
                columns={columns}
                dataSource={filtereddataBenhNhan}
                bordered
                onRow={(record) => ({
                  onClick: () => setSelectedPatient(record),
                })}
                rowClassName={(record) =>
                  record.key === selectedPatient?.key
                    ? "selected-row"
                    : "clickable-row"
                }
                pagination={{
                  total: filtereddataBenhNhan.length,
                  showTotal: (total) => `Total ${total} items`,
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
              />
            </div>
          </>
        ) : (
          <div className="kham-benh-layout">
            <div className="kb-info-block">
              <div className="kb-block-header">
                <span className="kb-title">Thông tin bệnh nhân</span>
                <span className="kb-link">Thông tin chi tiết &gt;</span>
              </div>
              <Row align="middle" gutter={24} className="kb-row-data">
                <Col span={8} className="flex-align-center">
                  <span className="label-bold">Mã bệnh nhân:</span>
                  <Input
                    placeholder="Nhập mã BN..."
                    value={selectedPatient?.maBN}
                    addonAfter={<SettingOutlined style={{color: "#888"}} />}
                    style={{width: "60%", marginLeft: 8}}
                  />
                </Col>
                <Col span={8}>
                  <span className="label-bold">Họ tên:</span>{" "}
                  {selectedPatient?.tenBN}
                </Col>
                <Col span={8}>
                  <span className="label-bold">Giới tính:</span>{" "}
                  {selectedPatient?.gioiTinh}
                </Col>
              </Row>
            </div>

            <div className="kb-info-block">
              <div className="kb-block-header">
                <span className="kb-title">Thông tin vào</span>
              </div>
              <Row align="middle" gutter={24} className="kb-row-data">
                <Col span={8} className="flex-align-center">
                  <span className="label-bold">Điều dưỡng:</span>
                  <Input
                    placeholder="Nhập..."
                    addonAfter={<SettingOutlined style={{color: "#888"}} />}
                    style={{width: "60%", marginLeft: 8}}
                  />
                </Col>
                <Col span={6}>
                  <span className="label-bold">Ngày khám:</span> 17/02/2024 |
                  15:00
                </Col>
                <Col span={5}>
                  <span className="label-bold">Bác sĩ:</span> Nguyễn Tiến Huy
                </Col>
                <Col span={5}>
                  <span className="label-bold">Phòng khám:</span> P015.Tai mũi
                  họng
                </Col>
              </Row>
            </div>

            <div className="kb-form-section">
              <Tabs
                type="card"
                className="kb-inner-tabs"
                defaultActiveKey="1"
                items={khamBenhInnerTabs}
              />
            </div>

            <div className="kb-footer-actions">
              <Button
                type="primary"
                className="btn-light-blue"
                icon={<LinkOutlined />}
              >
                Tương tác thuốc
              </Button>
              <Button
                type="primary"
                className="btn-light-blue"
                icon={<CalendarOutlined />}
                onClick={showReExamModal}
              >
                Tái khám
              </Button>
              <Button
                type="primary"
                className="btn-light-blue"
                icon={<PrinterOutlined />}
              >
                In đơn thuốc
              </Button>
              <Button
                type="primary"
                className="btn-light-blue"
                icon={<ReloadOutlined />}
              >
                Làm mới
              </Button>

              <Button
                type="primary"
                className="btn-blue"
                icon={<SaveOutlined />}
                onClick={handleSaveToHoSo}
              >
                Lưu
              </Button>

              <Button
                type="primary"
                className="btn-blue"
                icon={<CheckOutlined />}
                onClick={() => setActiveMainTab("1")}
              >
                Hoàn thành
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tái Khám */}
      <Modal
        title={<div style={{fontSize: 18, fontWeight: "bold"}}>Tái khám</div>}
        open={isReExamModalOpen}
        visible={isReExamModalOpen}
        onCancel={handleCancelReExamModal}
        width={700}
        closeIcon={<CloseOutlined style={{fontSize: 16}} />}
        footer={[
          <Button
            key="back"
            onClick={handleCancelReExamModal}
            style={{color: "#1890ff", borderColor: "#1890ff"}}
            icon={<CloseOutlined />}
          >
            Đóng
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSaveReExamModal}
            style={{backgroundColor: "#1890ff"}}
            icon={<SaveOutlined />}
          >
            Lưu
          </Button>,
        ]}
      >
        <div className="re-exam-modal-body" style={{paddingTop: 16}}>
          <Row gutter={24}>
            <Col span={8}>
              <div style={{color: "#333", fontWeight: 600, marginBottom: 8}}>
                Ngày tái khám
              </div>
              <DatePicker
                style={{width: "100%"}}
                format="DD/MM/YYYY"
                placeholder="10/10/2024"
                onChange={(date, dateString) =>
                  setReExamForm({...reExamForm, date: dateString})
                }
              />
            </Col>
            <Col span={8}>
              <div style={{color: "#333", fontWeight: 600, marginBottom: 8}}>
                Buổi
              </div>
              <Radio.Group
                value={reExamForm.session}
                onChange={(e) =>
                  setReExamForm({...reExamForm, session: e.target.value})
                }
              >
                <Radio value="sang">Sáng</Radio>
                <Radio value="chieu">Chiều</Radio>
              </Radio.Group>
            </Col>
            <Col span={8}>
              <div style={{color: "#333", fontWeight: 600, marginBottom: 8}}>
                Phòng
              </div>
              <Select
                value={reExamForm.room}
                onChange={(value) =>
                  setReExamForm({...reExamForm, room: value})
                }
                style={{width: "100%"}}
              >
                <Select.Option value="P015.Tai mũi họng">
                  P015.Tai mũi họng
                </Select.Option>
                <Select.Option value="P012.Răng hàm mặt">
                  P012.Răng hàm mặt
                </Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={24} style={{marginTop: 20}}>
            <Col span={24}>
              <div style={{color: "#333", fontWeight: 600, marginBottom: 8}}>
                Nội dung
              </div>
              <TextArea
                rows={3}
                placeholder="Viết gì đó..."
                value={reExamForm.content}
                onChange={(e) =>
                  setReExamForm({...reExamForm, content: e.target.value})
                }
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}
