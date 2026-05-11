import React, {useState} from "react";
import {
  Row,
  Col,
  Input,
  Table,
  Button,
  Select,
  Checkbox,
  Radio,
  Space,
  Popconfirm,
} from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  CheckOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./ChiDinhTab.scss";

export default function ChiDinhTab() {
  // --- STATE ---
  const [activeServiceTab, setActiveServiceTab] = useState("xetnghiem");
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("I04");

  // 1. DATA VÀ CỘT BẢNG: CHẨN ĐOÁN BAN ĐẦU
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

  // 2. DATA VÀ CỘT BẢNG: DANH SÁCH DỊCH VỤ ĐÃ CHỈ ĐỊNH
  const assignedServicesData = [
    {
      key: "1",
      tenDichVu: "Xét nghiệm khí máu",
      soLuong: 1,
      giaDichVu: "100.000đ",
      giaBHYT: "100.000đ",
      noiThucHien: "P101",
      loaiThuPhi: "BHYT",
      daThanhToan: true,
      daThucHien: true,
      hoanTra: false,
    },
    {
      key: "2",
      tenDichVu: "XN đường máu mao mạch",
      soLuong: 2,
      giaDichVu: "100.000đ",
      giaBHYT: "100.000đ",
      noiThucHien: "P103",
      loaiThuPhi: "BHYT",
      daThanhToan: true,
      daThucHien: true,
      hoanTra: true,
    },
  ];

  const assignedServicesColumns = [
    {title: "Tên dịch vụ", dataIndex: "tenDichVu"},
    {title: "Số lượng", dataIndex: "soLuong", align: "center", width: 80},
    {title: "Giá dịch vụ", dataIndex: "giaDichVu", align: "right"},
    {title: "Giá BHYT", dataIndex: "giaBHYT", align: "right"},
    {
      title: "Nơi thực hiện",
      dataIndex: "noiThucHien",
      render: (text) => (
        <Select
          defaultValue={text}
          style={{width: 100}}
          size="small"
          bordered={false}
        >
          <Select.Option value="P101">P101</Select.Option>
          <Select.Option value="P103">P103</Select.Option>
        </Select>
      ),
    },
    {
      title: "Loại thu phí",
      dataIndex: "loaiThuPhi",
      render: (text) => (
        <Select
          defaultValue={text}
          style={{width: 100}}
          size="small"
          bordered={false}
        >
          <Select.Option value="BHYT">BHYT</Select.Option>
          <Select.Option value="Dịch vụ">Dịch vụ</Select.Option>
        </Select>
      ),
    },
    {
      title: "Đã thanh toán",
      dataIndex: "daThanhToan",
      align: "center",
      render: (status) =>
        status && <CheckOutlined style={{color: "#52c41a", fontSize: 16}} />,
    },
    {
      title: "Đã thực hiện",
      dataIndex: "daThucHien",
      align: "center",
      render: (status) =>
        status && <CheckOutlined style={{color: "#52c41a", fontSize: 16}} />,
    },
    {
      title: "Hoàn trả",
      dataIndex: "hoanTra",
      align: "center",
      render: (checked) => <Checkbox defaultChecked={checked} />,
    },
    {
      title: "",
      key: "action",
      align: "center",
      width: 50,
      render: () => (
        <DeleteOutlined style={{color: "#ff4d4f", cursor: "pointer"}} />
      ),
    },
  ];

  // 3. DATA VÀ CỘT BẢNG: DỊCH VỤ TỪ PHÒNG KHÁC
  const otherRoomServicesData = [
    {
      key: "1",
      tenDichVu: "Xét nghiệm khí máu",
      phongChiDinh: "P101",
      tenBacSi: "Thanh Trúc",
    },
  ];

  const otherRoomServicesColumns = [
    {title: "Tên dịch vụ", dataIndex: "tenDichVu", align: "center"},
    {title: "Phòng chỉ định", dataIndex: "phongChiDinh", align: "center"},
    {title: "Tên bác sĩ", dataIndex: "tenBacSi", align: "center"},
  ];

  return (
    <div className="chi-dinh-tab-wrapper">
      {/* 1. KHỐI CHẨN ĐOÁN BAN ĐẦU */}
      <h4 className="cd-section-title">Chẩn đoán ban đầu</h4>
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

      {/* 2. KHỐI TABS NHÓM DỊCH VỤ */}
      <div className="service-type-tabs mt-24">
        {["Tất cả", "Xét nghiệm", "CĐHA", "TDCN", "PTTT"].map((tab) => {
          const tabKey = tab.toLowerCase().replace(/ /g, "");
          return (
            <div
              key={tab}
              className={`service-tab-item ${activeServiceTab === tabKey ? "active" : ""}`}
              onClick={() => setActiveServiceTab(tabKey)}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* 3. KHỐI TÌM KIẾM CHI TIẾT */}
      <div className="cd-filter-box mt-16">
        <h4 className="cd-section-title">Nhóm dịch vụ chi tiết</h4>
        <Row gutter={16}>
          <Col span={8}>
            <Select placeholder="---Tất cả---" style={{width: "100%"}} />
          </Col>
          <Col span={8}>
            <Select placeholder="---Tên dịch vụ---" style={{width: "100%"}} />
          </Col>
        </Row>
      </div>

      {/* 4. BẢNG DỊCH VỤ ĐÃ CHỈ ĐỊNH */}
      <div className="cd-table-block mt-24">
        <h4 className="cd-section-title">Danh sách dịch vụ đã chỉ định</h4>
        <Table
          rowSelection={{type: "checkbox"}}
          columns={assignedServicesColumns}
          dataSource={assignedServicesData}
          pagination={false}
          size="small"
          bordered
          className="custom-blue-table"
        />
      </div>

      {/* 5. BẢNG DỊCH VỤ PHÒNG KHÁC */}
      <div className="cd-table-block mt-24">
        <h4 className="cd-section-title">
          Danh sách dịch vụ đã chỉ định từ phòng khác
        </h4>
        <Table
          columns={otherRoomServicesColumns}
          dataSource={otherRoomServicesData}
          pagination={false}
          size="small"
          bordered
          className="custom-blue-table"
        />
      </div>
    </div>
  );
}
