import React, { useState, useEffect } from "react";
import { 
  Table, Button, Modal, Form, Input, Select, Row, Col, 
  message, Popconfirm, Tag, Space, Divider 
} from "antd";
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined 
} from "@ant-design/icons";
import "./ThemBenhNhan.scss";

const API_URL = "http://localhost:3000/dataBenhNhan";

export default function ThemBenhNhan() {
  const [form] = Form.useForm();
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =================================================================
  // 1. GET: LẤY DANH SÁCH BỆNH NHÂN TỪ JSON-SERVER
  // =================================================================
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu bệnh nhân!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // =================================================================
  // 2. MỞ MODAL THÊM / SỬA
  // =================================================================
  const showAddModal = () => {
    form.resetFields();
    setEditingId(null);
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    form.setFieldsValue(record);
    setEditingId(record.id); // Lưu lại ID để biết là đang sửa
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // =================================================================
  // 3. POST / PUT: LƯU BỆNH NHÂN (THÊM HOẶC SỬA)
  // =================================================================
  const handleSave = async (values) => {
    try {
      if (editingId) {
        // --- PUT: CẬP NHẬT BỆNH NHÂN ---
        // Lấy lại stt cũ của bệnh nhân đang sửa để không bị mất
        const currentPatient = patients.find(p => p.id === editingId);
        const updatedData = { ...values, stt: currentPatient.stt };

        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
        message.success("Cập nhật thông tin thành công!");
      } else {
        // --- POST: THÊM BỆNH NHÂN MỚI ---
        // Tự động tính STT mới = STT lớn nhất hiện tại + 1
        const maxStt = patients.length > 0 ? Math.max(...patients.map(p => p.stt || 0)) : 0;
        const newData = { ...values, stt: maxStt + 1 };

        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        });
        message.success("Thêm bệnh nhân mới thành công!");
      }
      
      setIsModalOpen(false);
      form.resetFields();
      fetchPatients(); // Tải lại danh sách sau khi lưu
    } catch (error) {
      message.error("Đã xảy ra lỗi khi lưu dữ liệu!");
    }
  };

  // =================================================================
  // 4. DELETE: XÓA BỆNH NHÂN
  // =================================================================
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      message.success("Xóa bệnh nhân thành công!");
      fetchPatients();
    } catch (error) {
      message.error("Lỗi khi xóa bệnh nhân!");
    }
  };

  // =================================================================
  // CỘT BẢNG HIỂN THỊ
  // =================================================================
  const columns = [
    { title: "STT", dataIndex: "stt", align: "center", width: 60 },
    { title: "Mã BN", dataIndex: "maBN", fontWeight: "bold" },
    { title: "Họ và Tên", dataIndex: "tenBN" },
    { title: "Giới tính", dataIndex: "gioiTinh", align: "center" },
    { title: "Ngày sinh", dataIndex: "ngaySinh", align: "center" },
    { title: "SĐT", dataIndex: "sdt", align: "center" },
    { title: "Dịch vụ", dataIndex: "dichVu" },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      render: (status) => {
        let color = status === "Hoàn thành" ? "success" : status === "Đang khám" ? "warning" : "processing";
        return <Tag color={color}>{status || "Chờ khám"}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            ghost 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => showEditModal(record)} 
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa bệnh nhân này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="them-benh-nhan-wrapper">
      <div className="page-header">
        <h2 className="page-title"><UserOutlined /> Quản Lý Danh Sách Bệnh Nhân</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal} size="large">
          Thêm Bệnh Nhân Mới
        </Button>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={patients}
          rowKey="id"
          loading={loading}
          bordered
          className="custom-blue-table"
          pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total} bệnh nhân` }}
        />
      </div>

      {/* MODAL FORM THÊM / SỬA */}
      <Modal
        title={<h2>{editingId ? "Cập Nhật Bệnh Nhân" : "Thêm Bệnh Nhân Mới"}</h2>}
        open={isModalOpen}
        onCancel={handleCancel}
        width={900}
        footer={[
          <Button key="cancel" onClick={handleCancel}>Hủy bỏ</Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>Lưu dữ liệu</Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} className="patient-form">
          
          <Divider orientation="left" plain>1. Thông tin cá nhân</Divider>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="maBN" label="Mã bệnh nhân" rules={[{ required: true, message: 'Nhập mã BN!' }]}><Input placeholder="VD: KH93484234" /></Form.Item></Col>
            <Col span={8}><Form.Item name="tenBN" label="Họ và tên" rules={[{ required: true, message: 'Nhập tên BN!' }]}><Input placeholder="VD: Nguyễn Văn A" /></Form.Item></Col>
            <Col span={8}>
              <Form.Item name="gioiTinh" label="Giới tính">
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="Nam">Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}><Form.Item name="ngaySinh" label="Ngày sinh"><Input placeholder="VD: 15/08/1990" /></Form.Item></Col>
            <Col span={8}><Form.Item name="tuoi" label="Tuổi"><Input type="number" placeholder="VD: 34" /></Form.Item></Col>
            <Col span={8}><Form.Item name="sdt" label="Số điện thoại"><Input placeholder="VD: 0909123456" /></Form.Item></Col>
            <Col span={24}><Form.Item name="diaChi" label="Địa chỉ"><Input placeholder="Nhập địa chỉ chi tiết..." /></Form.Item></Col>
          </Row>

          <Divider orientation="left" plain>2. Thông tin tiếp nhận & Khám bệnh</Divider>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="dichVu" label="Dịch vụ khám"><Input placeholder="VD: Khám tổng quát" /></Form.Item></Col>
            <Col span={8}><Form.Item name="ngayKham" label="Ngày khám"><Input placeholder="VD: 10/10/2024" /></Form.Item></Col>
            <Col span={8}>
              <Form.Item name="trangThai" label="Trạng thái">
                <Select placeholder="Trạng thái">
                  <Select.Option value="Chờ khám">Chờ khám</Select.Option>
                  <Select.Option value="Đang khám">Đang khám</Select.Option>
                  <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="loaiThuPhi" label="Loại thu phí">
                <Select placeholder="Chọn loại"><Select.Option value="BHYT">BHYT</Select.Option><Select.Option value="Dịch vụ">Dịch vụ</Select.Option></Select>
              </Form.Item>
            </Col>
            <Col span={8}><Form.Item name="doiTuong" label="Đối tượng BHYT"><Input placeholder="Mã thẻ BHYT nếu có" /></Form.Item></Col>
            <Col span={8}>
              <Form.Item name="uuTien" label="Loại ưu tiên">
                <Select placeholder="Chọn ưu tiên"><Select.Option value="Thường">Thường</Select.Option><Select.Option value="Cao">Cao</Select.Option></Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" plain>3. Thông tin người thân (Nếu có)</Divider>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="nguoiThan" label="Mối quan hệ"><Input placeholder="VD: Bố, Mẹ, Vợ..." /></Form.Item></Col>
            <Col span={8}><Form.Item name="hoTenNguoiThan" label="Họ tên người thân"><Input placeholder="Nhập họ tên" /></Form.Item></Col>
            <Col span={8}><Form.Item name="sdtNguoiThan" label="SĐT người thân"><Input placeholder="Nhập SĐT" /></Form.Item></Col>
          </Row>

        </Form>
      </Modal>
    </div>
  );
}