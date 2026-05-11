import {Table, Pagination, Select} from "antd";
import {useState, useMemo} from "react";
import "./TableDoiTuong.scss";

function TableDoiTuong({data = []}) {
  const [current, setCurrent] = useState(1);

  // ===== GROUP THEO NGÀY =====
  const grouped = useMemo(() => {
    const map = {};
    data.forEach((item) => {
      if (!map[item.date]) map[item.date] = [];
      map[item.date].push(item);
    });
    return map;
  }, [data]);

  const dates = Object.keys(grouped);
  const currentDate = dates[current - 1];
  const currentData = grouped[currentDate] || [];

  const tableData = currentData.map((item, index) => ({
    key: index,
    stt: index + 1,
    date: item.date,
    doiTuong: item.doiTuong,
    tongTien: item.soTien,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "8%",
      align: "center",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Đối tượng",
      dataIndex: "doiTuong",
      align: "center",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      align: "right",
      render: (v) => v?.toLocaleString("vi-VN"),
    },
  ];

  return (
    <div className="table-doituong">
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
      />

      <div className="table-footer">
        <div className="left">Tổng: {tableData.length} bản ghi</div>

        <div className="right">
          <Pagination
            simple
            current={current}
            total={dates.length}
            pageSize={1}
            onChange={(page) => setCurrent(page)}
          />

          <Select
            defaultValue="15"
            options={[
              {value: "10", label: "10 / trang"},
              {value: "15", label: "15 / trang"},
              {value: "20", label: "20 / trang"},
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default TableDoiTuong;
