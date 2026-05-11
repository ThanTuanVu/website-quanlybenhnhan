import {Tabs, DatePicker, Button, Row, Col} from "antd";
import ChartBlock from "./ChartBlock";
import TableDoiTuong from "./TableDoiTuong";
import TableThanhToan from "./TableThanhToan";
import {useEffect, useState} from "react";
import "./index.scss";

const {RangePicker} = DatePicker;

function DoanhThu() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("chart");

  useEffect(() => {
    fetch("http://localhost:3000/dataDoanhThu")
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setData(res);
        } else {
          setData(res.dataDoanhThu || []);
        }
      });
  }, []);

  const items = [
    {
      key: "chart",
      label: "Biểu đồ",
      children: <ChartBlock data={data} />,
    },
    {
      key: "doituong",
      label: "Đối tượng",
      children: <TableDoiTuong data={data} />,
    },
    {
      key: "thanhtoan",
      label: "Hình thức thanh toán",
      children: <TableThanhToan data={data} />,
    },
  ];

  return (
    <div style={{padding: 20}}>
      <h2>Doanh thu theo ngày</h2>

      <Row gutter={10} style={{marginBottom: 16, justifyContent: "end"}}>
        <Col>
          <RangePicker />
        </Col>
        <Col>
          <Button type="primary">Tìm kiếm</Button>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
}

export default DoanhThu;
