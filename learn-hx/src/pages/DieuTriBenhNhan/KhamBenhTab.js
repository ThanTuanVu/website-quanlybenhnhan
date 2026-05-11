import React, {useState} from "react";
import {Row, Col, Input, Table, Radio, Space, Button, Popconfirm} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./KhamBenhTab.scss";

const {TextArea} = Input;

export default function KhamBenhTab() {
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("I04");

  const [diagnosisData, setDiagnosisData] = useState([
    {id: "I01", name: "Cao huyết áp"},
    {id: "I02", name: "Ung thư họng"},
    {id: "I04", name: "Đau răng"},
  ]);

  // 2. CÁC STATE QUẢN LÝ VIỆC SỬA
  const [editingId, setEditingId] = useState("");
  const [editNameValue, setEditNameValue] = useState("");

  // Hàm xử lý Xóa
  const handleDelete = (id) => {
    const newData = diagnosisData.filter((item) => item.id !== id);
    setDiagnosisData(newData);
    if (primaryDiagnosis === id) setPrimaryDiagnosis(null);
  };

  // Hàm kích hoạt chế độ Sửa
  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditNameValue(record.name);
  };

  // Hàm Lưu sau khi Sửa
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

  // Hàm Hủy sửa
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
        <Radio checked={primaryDiagnosis === text} onChange={() => setPrimaryDiagnosis(text)}>
          {text}
        </Radio>
      )
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
      }
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
              <CheckOutlined style={{ color: "#1890ff", cursor: "pointer", fontSize: 16 }} onClick={() => handleSave(record.id)} />
              <CloseOutlined style={{ color: "#ff4d4f", cursor: "pointer", fontSize: 16 }} onClick={handleCancelEdit} />
            </Space>
          );
        }

        return (
          <Space>
            <EditOutlined 
              style={{ color: "#52c41a", cursor: "pointer" }} 
              onClick={() => handleEdit(record)} 
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa bệnh này?" 
              onConfirm={() => handleDelete(record.id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }} />
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  return (
    <div className="kham-benh-tab-wrapper">
      <h4 className="kb-section-title">Chỉ số sinh hiệu</h4>
      <Row gutter={16}>
        <Col span={3}>
          <div className="kb-input-label">Mạch</div>
          <Input placeholder="-" suffix="Nhịp/phút" className="suffix-input" />
        </Col>
        <Col span={3}>
          <div className="kb-input-label">Nhiệt độ</div>
          <Input placeholder="-" suffix="°C" className="suffix-input" />
        </Col>
        <Col span={3}>
          <div className="kb-input-label">Huyết áp</div>
          <Input placeholder="-" suffix="mmHg" className="suffix-input" />
        </Col>
        <Col span={3}>
          <div className="kb-input-label">Nhịp thở</div>
          <Input placeholder="-" suffix="Lần/phút" className="suffix-input" />
        </Col>
        <Col span={3}>
          <div className="kb-input-label">SPO2</div>
          <Input placeholder="-" suffix="%" className="suffix-input" />
        </Col>
        <Col span={3}>
          <div className="kb-input-label">Chiều cao</div>
          <Input placeholder="-" suffix="cm" className="suffix-input" />
        </Col>
        <Col span={3}>
          <div className="kb-input-label">Cân nặng</div>
          <Input placeholder="-" suffix="kg" className="suffix-input" />
        </Col>
        <Col span={3}>
          <div className="kb-input-label">BMI</div>
          <Input
            placeholder="-"
            suffix="kg"
            className="suffix-input"
            disabled
          />
        </Col>
      </Row>

      <h4 className="kb-section-title mt-24">Hỏi bệnh</h4>
      <Row gutter={24}>
        <Col span={12}>
          <div className="kb-input-label">Lý do khám</div>
          <TextArea rows={2} placeholder="Viết gì đó..." />
        </Col>
        <Col span={12}>
          <div className="kb-input-label">Quá trình bệnh lý</div>
          <TextArea rows={2} placeholder="Viết gì đó..." />
        </Col>
      </Row>

      <h4 className="kb-section-title mt-24">Tiền sử bệnh</h4>
      <Row gutter={24}>
        <Col span={12}>
          <div className="kb-input-label">Bản thân</div>
          <TextArea rows={2} placeholder="Viết gì đó..." />
        </Col>
        <Col span={12}>
          <div className="kb-input-label">Gia đình</div>
          <TextArea rows={2} placeholder="Viết gì đó..." />
        </Col>
      </Row>

      <h4 className="kb-section-title mt-24">Khám bệnh</h4>
      <Row gutter={24}>
        <Col span={12}>
          <div className="kb-input-label">Toàn thân</div>
          <TextArea rows={2} placeholder="Viết gì đó..." />
        </Col>
        <Col span={12}>
          <div className="kb-input-label">Các bộ phận</div>
          <TextArea rows={2} placeholder="Viết gì đó..." />
        </Col>
      </Row>

      <div className="diagnosis-header mt-24">
        <h4 className="kb-section-title mb-0">Chẩn đoán ban đầu</h4>
        <span className="kb-link">Chẩn đoán cuối &gt;</span>
      </div>
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
      <Table
        columns={diagColumns}
        dataSource={diagnosisData}
        rowKey="id"
        pagination={false}
        size="small"
        className="custom-blue-table"
        bordered
      />
    </div>
  );
}
