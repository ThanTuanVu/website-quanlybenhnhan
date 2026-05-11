import React, {useState} from "react";
import {
  Row,
  Col,
  Input,
  Table,
  Button,
  Space,
  Modal,
  Select,
  Radio,
  Popconfirm,
  message,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  MedicineBoxOutlined,
  CloseOutlined,
  ReloadOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./ToaThuocTab.scss";

export default function ToaThuocTab({
  onShowReExamModal,
  savedReExamData,
  onDeleteReExam,
}) {
  // --- STATE CHẨN ĐOÁN CUỐI ---
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("I04");
  const [isOldPrescriptionModalOpen, setIsOldPrescriptionModalOpen] =
    useState(false);

  const [diagnosisData, setDiagnosisData] = useState([
    {id: "I01", name: "Cao huyết áp"},
    {id: "I02", name: "Ung thư họng"},
    {id: "I04", name: "Đau răng"},
  ]);

  const [editingId, setEditingId] = useState("");
  const [editNameValue, setEditNameValue] = useState("");

  // --- LOGIC CHẨN ĐOÁN CUỐI ---
  const handleDelete = (id) => {
    const newData = diagnosisData.filter((item) => item.id !== id);
    setDiagnosisData(newData);
    if (primaryDiagnosis === id) setPrimaryDiagnosis(null);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditNameValue(record.name);
  };

  const handleSave = (id) => {
    const newData = diagnosisData.map((item) => {
      if (item.id === id) {
        return {...item, name: editNameValue};
      }
      return item;
    });
    setDiagnosisData(newData);
    setEditingId("");
  };

  const handleCancelEdit = () => {
    setEditingId("");
    setEditNameValue("");
  };

  const diagColumns = [
    {
      title: "Mã bệnh",
      dataIndex: "id",
      width: 120,
      render: (text) => (
        <Radio
          checked={primaryDiagnosis === text}
          onChange={() => setPrimaryDiagnosis(text)}
        >
          {text}
        </Radio>
      ),
    },
    {
      title: "Tên bệnh",
      dataIndex: "name",
      render: (text, record) => {
        if (editingId === record.id) {
          return (
            <Input
              value={editNameValue}
              onChange={(e) => setEditNameValue(e.target.value)}
              onPressEnter={() => handleSave(record.id)}
              autoFocus
            />
          );
        }
        return text;
      },
    },
    {
      title: "",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => {
        if (editingId === record.id) {
          return (
            <Space>
              <CheckOutlined
                style={{color: "#1890ff", cursor: "pointer", fontSize: 16}}
                onClick={() => handleSave(record.id)}
              />
              <CloseOutlined
                style={{color: "#ff4d4f", cursor: "pointer", fontSize: 16}}
                onClick={handleCancelEdit}
              />
            </Space>
          );
        }

        return (
          <Space>
            <EditOutlined
              style={{color: "#52c41a", cursor: "pointer"}}
              onClick={() => handleEdit(record)}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa bệnh này?"
              onConfirm={() => handleDelete(record.id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <DeleteOutlined style={{color: "#ff4d4f", cursor: "pointer"}} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const initialMedState = {
    ten: "",
    ngay: "",
    sang: "",
    trua: "",
    chieu: "",
    toi: "",
    dvd: "Viên",
    sl: "",
    dd: "Uống",
    ghichu: "",
  };
  const [currentMedicine, setCurrentMedicine] = useState(initialMedState);

  // State lưu danh sách thuốc đã được thêm xuống bảng
  const [prescribedList, setPrescribedList] = useState([]);

  // Hàm cập nhật state khi nhập input
  const handleMedInputChange = (field, value) => {
    setCurrentMedicine((prev) => ({...prev, [field]: value}));
  };

  // Hàm ghép chuỗi cách dùng
  const generateCachDung = (med) => {
    let text = [];
    if (med.sang) text.push(`sáng ${med.sang}`);
    if (med.trua) text.push(`trưa ${med.trua}`);
    if (med.chieu) text.push(`chiều ${med.chieu}`);
    if (med.toi) text.push(`tối ${med.toi}`);

    let cachDung = text.length > 0 ? `Ngày uống ${text.join(", ")}` : "";
    if (med.ngay) cachDung += ` (trong ${med.ngay} ngày)`;
    if (med.ghichu) cachDung += ` - ${med.ghichu}`;
    return cachDung;
  };

  // Hàm xử lý khi bấm nút Thêm
  const handleAddMedicine = () => {
    if (!currentMedicine.ten.trim() || !currentMedicine.sl.trim()) {
      message.warning("Vui lòng nhập Tên thuốc và Số lượng bắt buộc!");
      return;
    }

    const newMedicine = {
      key: Date.now().toString(),
      stt: prescribedList.length + 1,
      ten: currentMedicine.ten,
      sl: currentMedicine.sl,
      dvt: currentMedicine.dvd,
      cachdung: generateCachDung(currentMedicine),
      dongia: "0",
      sotien: "0",
      ...currentMedicine,
    };

    setPrescribedList([...prescribedList, newMedicine]);
    setCurrentMedicine(initialMedState);
  };

  // Hàm xóa thuốc khỏi danh sách đã kê
  const handleDeleteMedicine = (key) => {
    const newList = prescribedList.filter((item) => item.key !== key);
    const updatedList = newList.map((item, index) => ({
      ...item,
      stt: index + 1,
    }));
    setPrescribedList(updatedList);
  };

  // CỘT: FORM NHẬP THUỐC
  const medInputCols = [
    {
      title: (
        <>
          <span className="text-danger">*</span>Mã/Tên thuốc/ Hoạt chất
        </>
      ),
      dataIndex: "ten",
      render: () => (
        <Input
          bordered={false}
          placeholder="Nhập..."
          value={currentMedicine.ten}
          onChange={(e) => handleMedInputChange("ten", e.target.value)}
          onPressEnter={handleAddMedicine}
        />
      ),
    },
    {
      title: (
        <>
          <span className="text-danger">*</span>Số ngày
        </>
      ),
      dataIndex: "ngay",
      width: 80,
      render: () => (
        <Input
          bordered={false}
          type="number"
          value={currentMedicine.ngay}
          onChange={(e) => handleMedInputChange("ngay", e.target.value)}
          onPressEnter={handleAddMedicine}
        />
      ),
    },
    {
      title: "Sáng",
      dataIndex: "sang",
      width: 60,
      render: () => (
        <Input
          bordered={false}
          value={currentMedicine.sang}
          onChange={(e) => handleMedInputChange("sang", e.target.value)}
          onPressEnter={handleAddMedicine}
        />
      ),
    },
    {
      title: "Trưa",
      dataIndex: "trua",
      width: 60,
      render: () => (
        <Input
          bordered={false}
          value={currentMedicine.trua}
          onChange={(e) => handleMedInputChange("trua", e.target.value)}
          onPressEnter={handleAddMedicine}
        />
      ),
    },
    {
      title: "Chiều",
      dataIndex: "chieu",
      width: 60,
      render: () => (
        <Input
          bordered={false}
          value={currentMedicine.chieu}
          onChange={(e) => handleMedInputChange("chieu", e.target.value)}
          onPressEnter={handleAddMedicine}
        />
      ),
    },
    {
      title: "Tối",
      dataIndex: "toi",
      width: 60,
      render: () => (
        <Input
          bordered={false}
          value={currentMedicine.toi}
          onChange={(e) => handleMedInputChange("toi", e.target.value)}
          onPressEnter={handleAddMedicine}
        />
      ),
    },
    {
      title: "Đơn vị dùng",
      dataIndex: "dvd",
      width: 110,
      render: () => (
        <Select
          value={currentMedicine.dvd}
          onChange={(val) => handleMedInputChange("dvd", val)}
          bordered={false}
          style={{width: "100%"}}
        >
          <Select.Option value="Viên">Viên</Select.Option>
          <Select.Option value="Ống">Ống</Select.Option>
          <Select.Option value="Gói">Gói</Select.Option>
        </Select>
      ),
    },
    {
      title: (
        <>
          <span className="text-danger">*</span>Số lượng
        </>
      ),
      dataIndex: "sl",
      width: 80,
      render: () => (
        <Input
          bordered={false}
          type="number"
          value={currentMedicine.sl}
          onChange={(e) => handleMedInputChange("sl", e.target.value)}
          onPressEnter={handleAddMedicine}
        />
      ),
    },
    {
      title: "Đường dùng",
      dataIndex: "dd",
      width: 110,
      render: () => (
        <Select
          value={currentMedicine.dd}
          onChange={(val) => handleMedInputChange("dd", val)}
          bordered={false}
          style={{width: "100%"}}
        >
          <Select.Option value="Uống">Uống</Select.Option>
          <Select.Option value="Tiêm">Tiêm</Select.Option>
          <Select.Option value="Bôi">Bôi</Select.Option>
        </Select>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "ghichu",
      render: () => (
        <Input
          bordered={false}
          value={currentMedicine.ghichu}
          onChange={(e) => handleMedInputChange("ghichu", e.target.value)}
          onPressEnter={handleAddMedicine}
          placeholder="Nhập ghi chú..."
        />
      ),
    },
    {
      title: "",
      key: "action",
      width: 40,
      render: () => (
        <Button
          type="text"
          icon={<PlusCircleOutlined style={{color: "#1890ff", fontSize: 18}} />}
          onClick={handleAddMedicine}
        />
      ),
    },
  ];

  // CỘT: DANH SÁCH THUỐC ĐÃ KÊ
  const prescribedCols = [
    {
      title: "",
      dataIndex: "drag",
      width: 40,
      align: "center",
      render: () => "=",
    },
    {title: "STT", dataIndex: "stt", width: 50, align: "center"},
    {title: "Tên thuốc", dataIndex: "ten", align: "left"},
    {title: "Số lượng", dataIndex: "sl", align: "center"},
    {title: "ĐVT", dataIndex: "dvt", align: "center"},
    {title: "Cách dùng", dataIndex: "cachdung", align: "left"},
    {title: "Đơn giá", dataIndex: "dongia", align: "right"},
    {title: "Số tiền", dataIndex: "sotien", align: "right"},
    {
      title: "",
      key: "action",
      align: "center",
      width: 80,
      render: (_, record) => (
        <Space>
          <EditOutlined
            style={{color: "#52c41a", cursor: "pointer"}}
            title="Tính năng sửa đang phát triển"
          />
          <DeleteOutlined
            style={{color: "#ff4d4f", cursor: "pointer"}}
            onClick={() => handleDeleteMedicine(record.key)}
          />
        </Space>
      ),
    },
  ];

  // --- MODAL DATA ---
  const oldPrescriptionCols = [
    {title: "STT", dataIndex: "stt", align: "center", width: 60},
    {title: "Tên thuốc", dataIndex: "ten"},
    {title: "Số lượng", dataIndex: "sl", align: "center"},
    {title: "ĐVT", dataIndex: "dvt", align: "center"},
    {title: "Cách dùng", dataIndex: "cachdung"},
    {title: "Đơn giá", dataIndex: "dongia", align: "right"},
    {title: "Số tiền", dataIndex: "sotien", align: "right"},
  ];

  const oldPrescriptionData = [
    {
      key: "1",
      stt: 1,
      ten: "Panfor SR-500 500mg",
      sl: 6,
      dvt: "Viên",
      cachdung: "Ngày uống 2 lần, sáng 1 viên, chiều 0.5 viên, sau ăn",
      dongia: "1,000.00",
      sotien: "6,000.00",
    },
    {
      key: "2",
      stt: 2,
      ten: "Panfor SR-500 500mg",
      sl: 6,
      dvt: "Viên",
      cachdung: "Ngày uống 2 lần, sáng 1 viên, chiều 0.5 viên, sau ăn",
      dongia: "1,000.00",
      sotien: "6,000.00",
    },
    {
      key: "3",
      stt: 3,
      ten: "Panfor SR-500 500mg",
      sl: 6,
      dvt: "Viên",
      cachdung: "Ngày uống 2 lần, sáng 1 viên, chiều 0.5 viên, sau ăn",
      dongia: "1,000.00",
      sotien: "6,000.00",
    },
  ];

  return (
    <div className="toa-thuoc-tab-wrapper">
      {/* 1. CHẨN ĐOÁN CUỐI */}
      <h4 className="cd-section-title">Chẩn đoán cuối</h4>
      <Row gutter={8} style={{marginBottom: 16}}>
        <Col span={10}>
          <Input placeholder="I10 - Tăng huyết áp vô căn nguyên phát" />
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            ghost
            icon={<PlusCircleOutlined />}
            style={{width: "100%"}}
          >
            Thêm
          </Button>
        </Col>
      </Row>
      <div className="cd-table-container">
        <Table
          columns={diagColumns}
          dataSource={diagnosisData}
          pagination={false}
          size="small"
          bordered
          className="custom-blue-table"
        />
      </div>

      {/* 2. TOOLBAR CÁC LOẠI ĐƠN */}
      <div className="prescription-toolbar mt-24">
        <Space className="presc-types">
          <Button type="primary">Đơn BHYT</Button>
          <Button>Đơn mua ngoài</Button>
        </Space>
        <Button
          type="primary"
          icon={<MedicineBoxOutlined />}
          onClick={() => setIsOldPrescriptionModalOpen(true)}
        >
          Đơn thuốc cũ
        </Button>
      </div>

      {/* 3. DÒNG NHẬP LIỆU THUỐC MỚI */}
      <div className="medicine-input-row mt-16">
        <Table
          columns={medInputCols}
          dataSource={[{key: "input"}]}
          pagination={false}
          bordered
          size="small"
          className="custom-blue-table med-input-table"
        />
      </div>

      {/* 4. BẢNG THUỐC ĐÃ KÊ */}
      <div className="prescribed-table-wrapper mt-16">
        <Table
          columns={prescribedCols}
          dataSource={prescribedList}
          pagination={false}
          bordered
          size="small"
          className="custom-blue-table"
          locale={{emptyText: "Chưa có thuốc nào được kê"}}
        />
      </div>

      {/* 5. TỔNG TIỀN */}
      <div className="total-price-row mt-16">
        <b>
          Tổng tiền: <span className="highlight-price">0.00 vnđ</span>
        </b>
      </div>

      {/* 6. LỜI DẶN VÀ TÁI KHÁM */}
      <div className="advice-section mt-24">
        <Row align="middle" className="mb-12">
          <Col span={2}>
            <span className="kb-link-bold">Lời dặn</span>
          </Col>
          <Col span={22}>
            <Input placeholder="Viết gì đó..." />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={2}>
            <span className="kb-link-bold" onClick={onShowReExamModal}>
              Tái khám
            </span>
          </Col>
          <Col span={22}>
            {savedReExamData && savedReExamData.date ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#555",
                  fontWeight: 600,
                }}
              >
                Ngày {savedReExamData.date} - Buổi{" "}
                {savedReExamData.session === "sang" ? "sáng" : "chiều"} - Phòng{" "}
                {savedReExamData.room}
                <DeleteOutlined
                  onClick={onDeleteReExam}
                  style={{
                    color: "#ff4d4f",
                    marginLeft: 8,
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                  title="Xóa lịch tái khám"
                />
              </div>
            ) : (
              "-"
            )}
          </Col>
        </Row>
      </div>

      {/* MODAL LỊCH SỬ ĐƠN THUỐC (Giữ nguyên) */}
      <Modal
        title={
          <div style={{fontSize: 18, fontWeight: "bold"}}>
            Lịch sử đơn thuốc BHYT
          </div>
        }
        open={isOldPrescriptionModalOpen}
        onCancel={() => setIsOldPrescriptionModalOpen(false)}
        width={1000}
        closeIcon={<CloseOutlined style={{fontSize: 16}} />}
        footer={[
          <Button
            key="close"
            onClick={() => setIsOldPrescriptionModalOpen(false)}
            style={{color: "#1890ff", borderColor: "#1890ff"}}
            icon={<CloseOutlined />}
          >
            Đóng
          </Button>,
          <Button
            key="represcribe"
            type="primary"
            onClick={() => setIsOldPrescriptionModalOpen(false)}
            style={{backgroundColor: "#1890ff"}}
            icon={<ReloadOutlined />}
          >
            Kê lại đơn
          </Button>,
        ]}
      >
        <div className="old-presc-modal-body" style={{paddingTop: 8}}>
          <Row justify="space-between" align="top" style={{marginBottom: 16}}>
            <Col span={10}>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{color: "#333", fontSize: 13, marginBottom: 4}}>
                    Ngày khám
                  </div>
                  <Select defaultValue="10/10/2024" style={{width: "100%"}}>
                    <Select.Option value="10/10/2024">10/10/2024</Select.Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <div style={{color: "#333", fontSize: 13, marginBottom: 4}}>
                    Phòng
                  </div>
                  <Select
                    defaultValue="P015.Tai mũi họng"
                    style={{width: "100%"}}
                  >
                    <Select.Option value="P015.Tai mũi họng">
                      P015.Tai mũi họng
                    </Select.Option>
                  </Select>
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <div
                style={{textAlign: "right", fontSize: 13, lineHeight: "1.6"}}
              >
                <a href="#/" style={{fontWeight: "600", color: "#1890ff"}}>
                  Đơn thuốc ngày 10/10/2024 - P015.Tai mũi họng
                </a>
                <div>
                  <span style={{fontWeight: "600", color: "#333"}}>
                    Chẩn đoán cuối cùng:
                  </span>{" "}
                  A54.6 - Viêm họng cấp
                </div>
                <div>
                  <span style={{fontWeight: "600", color: "#333"}}>
                    Lời dặn:
                  </span>{" "}
                  Hạn chế máy lạnh
                </div>
              </div>
            </Col>
          </Row>

          <Table
            columns={oldPrescriptionCols}
            dataSource={oldPrescriptionData}
            pagination={false}
            bordered
            size="small"
            className="custom-blue-table"
          />

          <div style={{textAlign: "right", marginTop: 16, fontSize: 14}}>
            <b>
              Tổng tiền: <span style={{color: "#1890ff"}}>0.00 vnđ</span>
            </b>
          </div>
        </div>
      </Modal>
    </div>
  );
}
