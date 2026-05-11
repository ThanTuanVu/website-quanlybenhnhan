import {Column, Pie} from "@ant-design/plots";
import {useEffect, useState} from "react";
import {Col, Row} from "antd";

function BieuDoDoanhThu() {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dataDoanhThu")
      .then((res) => res.json())
      .then((data) => {
        setDataChart(data);
      });
  }, []);

  const config = {
    data: dataChart,
    xField: "date",
    yField: "soTien",
    colorField: "doiTuong",
    stack: true,
    label: {
      text: "soTien",
      textBaseline: "bottom",
      position: "inside",
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: "2",
        layout: {
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  };

  const config1 = {
    data: dataChart,
    xField: "date",
    yField: "soTien",
  };

  const config2 = {
    data: dataChart,
    colorField: "hinhThuc",
    angleField: "soTien",
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Column {...config} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Column {...config1} />
        </Col>
        <Col span={12}>
          <Pie {...config2} />
        </Col>
      </Row>
    </>
  );
}

export default BieuDoDoanhThu;
