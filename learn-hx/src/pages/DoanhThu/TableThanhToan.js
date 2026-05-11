import { Table } from "antd";
import { useState, useMemo } from "react";
import "./TableThanhToan.scss";

const dataSource = [
  {
    key: "1",
    stt: "1",
    ngay: "04/08/2025",
    tienMat: "0",
    qrmbDong: "683.990.494,04",
    qrmbTinh: "16.752.600",
    posMb: "0",
    chuyenKhoanKhac: "219.521.392",
    tongTien: "920.264.486,04",
  },
  {
    key: "2",
    stt: "2",
    ngay: "05/08/2025",
    tienMat: "100.000",
    qrmbDong: "500.000.000",
    qrmbTinh: "10.000.000",
    posMb: "50.000",
    chuyenKhoanKhac: "100.000.000",
    tongTien: "710.150.000",
  },
  {
    key: "3",
    stt: "3",
    ngay: "06/08/2025",
    tienMat: "0",
    qrmbDong: "300.000.000",
    qrmbTinh: "20.000.000",
    posMb: "0",
    chuyenKhoanKhac: "150.000.000",
    tongTien: "470.000.000",
  },
];

const moneyFields = [
  "tienMat",
  "qrmbDong",
  "qrmbTinh",
  "posMb",
  "chuyenKhoanKhac",
  "tongTien",
];

const parseMoney = (value = "0") => {
  return Number(value.toString().replace(/\./g, "").replace(",", ".")) || 0;
};

const formatMoney = (num) => num.toLocaleString("vi-VN");

const TableThanhToan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const currentData = useMemo(() => {
    return dataSource.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [currentPage, pageSize]);

  const pageTotals = useMemo(() => {
    return currentData.reduce((acc, row) => {
      moneyFields.forEach((field) => {
        acc[field] += parseMoney(row[field]);
      });
      return acc;
    }, Object.fromEntries(moneyFields.map((f) => [f, 0])));
  }, [currentData]);

  const headerStyle = (bg) => ({
    style: {
      backgroundColor: bg,
      color: "#000",
      fontWeight: 600,
      textAlign: "center",
    },
  });

  const paymentColumns = [
    { title: "Tiền mặt", dataIndex: "tienMat", width: 150 },
    { title: "QRMB Động", dataIndex: "qrmbDong", width: 180 },
    { title: "QRMB Tĩnh", dataIndex: "qrmbTinh", width: 160 },
    { title: "POS MB", dataIndex: "posMb", width: 140 },
    { title: "Chuyển khoản khác", dataIndex: "chuyenKhoanKhac", width: 170 },
  ].map((col) => ({
    ...col,
    align: "right",
    onHeaderCell: () => headerStyle("#ff99cc"),
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 60,
      align: "center",
      onHeaderCell: () => headerStyle("#a1d6ff"),
    },
    {
      title: "Ngày",
      dataIndex: "ngay",
      width: 120,
      align: "center",
      onHeaderCell: () => headerStyle("#a1d6ff"),
    },
    {
      title: "Hình thức thanh toán",
      children: paymentColumns,
      onHeaderCell: () => headerStyle("#90ee90"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      width: 180,
      align: "right",
      onHeaderCell: () => headerStyle("#a1d6ff"),
    },
  ];

  return (
    <div className="table-thanh-toan">
      <Table
        columns={columns}
        dataSource={currentData}
        bordered
        scroll={{ x: "max-content" }}
        pagination={{
          current: currentPage,
          pageSize,
          total: dataSource.length,
          simple: true,
          showTotal: (total) => `Tổng: ${total} bản ghi`,
          showSizeChanger: true,
          pageSizeOptions: ["1", "5", "10", "15"],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          onShowSizeChange: (_, size) => {
            setCurrentPage(1);
            setPageSize(size);
          },
        }}
        summary={() => (
          <Table.Summary.Row className="summary-row">
            <Table.Summary.Cell align="center">
              Tổng
            </Table.Summary.Cell>
            <Table.Summary.Cell />

            {moneyFields.slice(0, 5).map((field) => (
              <Table.Summary.Cell key={field} align="right">
                {formatMoney(pageTotals[field])}
              </Table.Summary.Cell>
            ))}

            <Table.Summary.Cell align="right">
              {formatMoney(pageTotals.tongTien)}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  );
};

export default TableThanhToan;