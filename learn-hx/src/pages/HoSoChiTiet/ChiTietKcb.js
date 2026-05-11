import React from "react";
import {Card, Tabs, Row, Col, Button, Collapse, Table} from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  ExperimentOutlined,
  DesktopOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import "./ChiTietKcb.scss";

export default function ChiTietKcb({record, onBack}) {
  const renderField = (label, value, colSpan = 6) => (
    <Col span={colSpan}>
      <div className="field-label">{label}</div>
      <div className="field-value">{value || ""}</div>
    </Col>
  );

  const {Panel} = Collapse;

  const dataSource = [
    {
      key: "1",
      tenchiso: "Glucose",
      ketqua: "5.4",
      donvido: "mmol/L",
      ngaygiokq: "........",
      bsthuchien: "........",
    },
    {
      key: "2",
      tenchiso: "Ure",
      ketqua: "4.2",
      donvido: "mmol/L",
      ngaygiokq: "........",
      bsthuchien: "........",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Tên chỉ số",
      dataIndex: "tenchiso",
      key: "tenchiso",
    },
    {
      title: "Kết quả",
      dataIndex: "ketqua",
      key: "ketqua",
    },
    {
      title: "Đơn vị đo",
      dataIndex: "donvido",
      key: "donvido",
    },
    {
      title: "Ngày giờ kết quả",
      dataIndex: "ngaygiokq",
      key: "ngaygiokq",
    },
    {
      title: "Bác sĩ thực hiện",
      dataIndex: "bsthuchien",
      key: "bsthuchien",
    },
  ];

  // data table phẫu thuật/thủ thuật
  const phauThuatColumns = [
    {title: "STT", dataIndex: "key", align: "center", width: 80},
    {title: "Ngày giờ thực hiện", dataIndex: "ngayGio", align: "left"},
    {title: "Tên dịch vụ", dataIndex: "ten", align: "left"},
  ];

  const phauThuatData = [
    {key: "1", ngayGio: "...........", ten: "..........."},
    {key: "2", ngayGio: "...........", ten: "..........."},
  ];

  return (
    <div className="chi-tiet-kcb-wrapper">
      <div style={{marginBottom: 16}}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          style={{paddingLeft: 0, color: "#555", fontWeight: 500}}
        >
          Quay lại danh sách KCB
        </Button>
      </div>

      <Card className="kcb-header-card" bodyStyle={{padding: "16px 24px"}}>
        <Row align="middle">
          <Col span={12}>
            <span style={{color: "#333", marginRight: 8}}>
              <b>Nơi KCB:</b>
            </span>
            <span style={{color: "#555"}}>
              {record?.noiKcb || "Tên nơi KCB"}
            </span>
          </Col>
          <Col span={12} style={{display: "flex", alignItems: "center"}}>
            <CalendarOutlined style={{marginRight: 8, color: "#333"}} />
            <span style={{color: "#333", marginRight: 8}}>
              <b>Ngày điều trị:</b>
            </span>
            <span style={{color: "#555"}}>31/03/2026 — 31/03/2026</span>
          </Col>
        </Row>
      </Card>

      <Tabs
        defaultActiveKey="1"
        className="kcb-detail-tabs"
        items={[
          {
            key: "1",
            label: (
              <span>
                <InfoCircleOutlined /> Thông tin KCB
              </span>
            ),
            children: (
              <div className="tab-content-kcb">
                <h4 className="section-title">1. Thông tin tiếp nhận:</h4>
                <Row gutter={[32, 16]}>
                  {renderField("Hình thức khám", "......", 6)}
                  {renderField("Đối tượng khám", "......", 6)}
                  {renderField("Ngày vào viện", record?.ngayVao, 6)}
                  {renderField("Ngày ra viện", record?.ngayRa, 6)}

                  {renderField("Thông tin chuyển tuyến", "Có / Không", 6)}
                  {renderField("Số giấy chuyển tuyến", "......", 6)}
                  {renderField("Nơi đi", "......", 6)}
                  {renderField("Nơi đến", "......", 6)}
                </Row>

                <h4 className="section-title mt-32">
                  2. Thông tin Lý do và Chẩn đoán sơ bộ:
                </h4>
                <Row gutter={[32, 16]}>
                  {renderField("Lý do khám", "......................", 12)}
                  {renderField("Chẩn đoán sơ bộ", "......................", 12)}
                </Row>

                <h4 className="section-title mt-32">
                  3. Thông tin Chẩn đoán và điều trị:
                </h4>
                <Row gutter={[32, 16]}>
                  {renderField("Bệnh chính", "......................", 12)}
                  {renderField(
                    "Bệnh kèm theo (nếu có)",
                    "......................",
                    12,
                  )}
                  {renderField(
                    "Phương pháp điều trị",
                    "......................",
                    12,
                  )}
                  {renderField(
                    "Lời dặn của bác sĩ",
                    "......................",
                    12,
                  )}
                </Row>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <span>
                <ExperimentOutlined /> Xét nghiệm (06)
              </span>
            ),
            children: (
              <div className="tab-content-xet-nghiem">
                <Collapse
                  defaultActiveKey={["group1"]}
                  expandIconPosition="end"
                  className="group-xet-nghiem-collapse"
                >
                  <Panel
                    header={
                      <div className="group-header">
                        <TeamOutlined style={{marginRight: 8}} />
                        <b>Ngày: 01/01/2026 - BS: Nguyễn Minh Khoa</b>
                      </div>
                    }
                    key="group1"
                  >
                    <Collapse
                      ghost
                      expandIconPosition="end"
                      className="chi-dinh-list-collapse"
                    >
                      <Panel
                        header={<b>Chỉ định 1: Xét nghiệm sinh hóa máu</b>}
                        key="cd1"
                        className="chi-dinh-item"
                      >
                        <div>Chỉ số chi tiết:</div>
                        <Table
                          dataSource={dataSource}
                          columns={columns}
                          pagination={false}
                        />
                        <div style={{marginTop: 5}}>Kết luận:</div>
                        <b style={{paddingLeft: 10, color: "blue"}}>
                          KHÔNG THẤY DẤU HIỆU BẤT THƯỜNG
                        </b>
                      </Panel>

                      <Panel
                        header={<b>Chỉ định 2: Huyết học</b>}
                        key="cd2"
                        className="chi-dinh-item"
                      >
                        <p>Nội dung chi tiết xét nghiệm huyết học...</p>
                      </Panel>

                      <Panel
                        header={<b>Chỉ định 3: ........................</b>}
                        key="cd3"
                        className="chi-dinh-item"
                      >
                        <p>Nội dung trống...</p>
                      </Panel>
                    </Collapse>
                  </Panel>
                </Collapse>
                <Collapse
                  defaultActiveKey={["group1"]}
                  expandIconPosition="end"
                  className="group-xet-nghiem-collapse"
                >
                  <Panel
                    header={
                      <div className="group-header">
                        <TeamOutlined style={{marginRight: 8}} />
                        <b>Ngày: 01/01/2026 - BS: Trần Minh Hiểu</b>
                      </div>
                    }
                    key="group2"
                  >
                    <Collapse
                      ghost
                      expandIconPosition="end"
                      className="chi-dinh-list-collapse"
                    >
                      <Panel
                        header={<b>Chỉ định 1: Xét nghiệm sinh hóa máu</b>}
                        key="cd1"
                        className="chi-dinh-item"
                      >
                        <div>Chỉ số chi tiết:</div>
                        <Table
                          dataSource={dataSource}
                          columns={columns}
                          pagination={false}
                        />
                        <div style={{marginTop: 5}}>Kết luận:</div>
                        <b style={{paddingLeft: 10, color: "blue"}}>
                          KHÔNG THẤY DẤU HIỆU BẤT THƯỜNG
                        </b>
                      </Panel>
                      <Panel
                        header={<b>Chỉ định 2: Huyết học</b>}
                        key="cd2"
                        className="chi-dinh-item"
                      >
                        <p>Nội dung xét nghiệm hóa học...</p>
                      </Panel>
                      <Panel
                        header={<b>Chỉ định 3: ..............</b>}
                        key="cd3"
                        className="chi-dinh-item"
                      >
                        <p>Nội dung trống...</p>
                      </Panel>
                    </Collapse>
                  </Panel>
                </Collapse>
              </div>
            ),
          },
          {
            key: "3",
            label: (
              <span>
                <DesktopOutlined /> CĐHA & TDCN (02)
              </span>
            ),
            children: (
              <div className="tab-content-cdha">
                <div className="cdha-table-wrapper">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered
                    size="middle"
                  />
                </div>
                <div className="cdha-result-detail">
                  <Collapse
                    ghost
                    expandIconPosition="end"
                    className="result-collapse"
                  >
                    <Panel
                      header={
                        <div className="result-header">
                          <p>KẾT QUẢ CHI TIẾT</p>
                        </div>
                      }
                      key="1"
                    >
                      <div className="result-body">
                        <p>
                          <b style={{color: "blue"}}>Ngày giờ kết quả:</b>{" "}
                          30/4/2026 11:30
                        </p>

                        <b style={{color: "blue"}}>Kết quả chi tiết:</b>
                        <ul style={{marginTop: 0}}>
                          <li>Lồng ngực cân đối.</li>
                          <li>Hai trường phổi sáng, Không thấy bất thường.</li>
                          <li>Rốn phổi hai bên đâm, Bóng tim không to.</li>
                          <li>
                            Vòm hoành hai bên nhẫn, góc sườn hoành hai bên nhọn.
                          </li>
                        </ul>

                        <div style={{color: "blue"}}>Kết luận:</div>
                        <b style={{color: "blue"}}>
                          HIỆN TẠI CHƯA THẤY HÌNH ẢNH BẤT THƯỜNG
                        </b>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            ),
          },
          {
            key: "4",
            label: (
              <span>
                <MedicineBoxOutlined /> Phẫu thuật/thủ thuật (02)
              </span>
            ),
            children: (
              <div className="tab-content-phau-thuat">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="end"
                  className="main-pt-collapse"
                >
                  <Panel
                    header={
                      <div className="pt-header">
                        <TeamOutlined style={{marginRight: 8}} />
                        <b>PHẪU THUẬT</b>
                      </div>
                    }
                    key="1"
                  >
                    <div className="pt-table-wrapper">
                      <Table
                        columns={phauThuatColumns}
                        dataSource={phauThuatData}
                        pagination={false}
                        bordered
                        size="middle"
                      />
                    </div>

                    <Collapse
                      expandIconPosition="end"
                      defaultActiveKey={["detail"]}
                      ghost
                      className="detail-pt-collapse"
                    >
                      <Panel
                        header={
                          <b className="detail-header-text">KẾT QUẢ CHI TIẾT</b>
                        }
                        key="detail"
                      >
                        <div className="detail-pt-body">
                          <Row gutter={[24, 16]}>
                            {renderField(
                              "Ngày giờ thực hiện",
                              "15/10/2024 11:14",
                              8,
                            )}
                            {renderField("Người thực hiện", "Lâm Trọng Hà", 8)}
                            {renderField(
                              "Vị trí thực hiện",
                              "....................................................",
                              8,
                            )}

                            {renderField("Phương pháp vô cảm", "1: Gây mê", 24)}
                          </Row>

                          <div className="cach-thuc-thuc-hien mt-16">
                            <div className="field-label">
                              Cách thức thực hiện
                            </div>
                            <ul className="ctth-list">
                              <li>
                                Cách 1:
                                ....................................................
                              </li>
                              <li>
                                Cách 2:
                                ....................................................
                              </li>
                              <li>
                                Cách 3:
                                ....................................................
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </Panel>
                </Collapse>

                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="end"
                  className="main-pt-collapse"
                >
                  <Panel
                    header={
                      <div className="pt-header">
                        <TeamOutlined style={{marginRight: 8}} />
                        <b>THỦ THUẬT</b>
                      </div>
                    }
                    key="1"
                  >
                    <div className="pt-table-wrapper">
                      <Table
                        columns={phauThuatColumns}
                        dataSource={phauThuatData}
                        pagination={false}
                        bordered
                        size="middle"
                      />
                    </div>

                    <Collapse
                      expandIconPosition="end"
                      defaultActiveKey={["detail"]}
                      ghost
                      className="detail-pt-collapse"
                    >
                      <Panel
                        header={
                          <b className="detail-header-text">KẾT QUẢ CHI TIẾT</b>
                        }
                        key="detail"
                      >
                        <div className="detail-pt-body">
                          <Row gutter={[24, 16]}>
                            {renderField(
                              "Ngày giờ thực hiện",
                              "15/10/2024 11:14",
                              8,
                            )}
                            {renderField("Người thực hiện", "Lâm Trọng Hà", 8)}
                            {renderField(
                              "Vị trí thực hiện",
                              "....................................................",
                              8,
                            )}

                            {renderField("Phương pháp vô cảm", "1: Gây mê", 24)}
                          </Row>

                          <div className="cach-thuc-thuc-hien mt-16">
                            <div className="field-label">
                              Cách thức thực hiện
                            </div>
                            <ul className="ctth-list">
                              <li>
                                Cách 1:
                                ....................................................
                              </li>
                              <li>
                                Cách 2:
                                ....................................................
                              </li>
                              <li>
                                Cách 3:
                                ....................................................
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </Panel>
                </Collapse>
              </div>
            ),
          },
          {
            key: "5",
            label: (
              <span>
                <TeamOutlined /> Hội chuẩn
              </span>
            ),
            children: (
              <div className="tab-content-hoi-chuan">
                <div className="hoi-chuan-table-wrapper">
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    bordered
                    size="middle"
                  />
                </div>

                <div className="hoi-chuan-result-detail">
                  <Collapse
                    expandIconPosition="end"
                    ghost
                    className="result-collapse"
                  >
                    <Panel
                      header={
                        <div className="result-header">
                          <b>KẾT QUẢ CHI TIẾT</b>
                        </div>
                      }
                      key="2"
                    >
                      <p>Nội dung....</p>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            ),
          },
          {
            key: "6",
            label: (
              <span>
                <ExperimentOutlined /> Diễn biến lâm sàng
              </span>
            ),
            children: (
              <div className="tab-content-lam-sang">
                <div className="lam-sang-table-wrapper">
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={false}
                    size="middle"
                  />
                </div>
              </div>
            ),
          },
          {
            key: "7",
            label: (
              <span>
                <MedicineBoxOutlined /> Hồ sơ pháp lý
              </span>
            ),
            children: (
              <div className="tab-content-phap-ly">
                <Collapse
                  defaultActiveKey={["group1"]}
                  expandIconPosition="end"
                  className="group-phap-ly-collapse"
                >
                  <Panel
                    header={
                      <div className="group-header">
                        <ReconciliationOutlined style={{marginRight: 8}} />
                        <b>GIẤY RA VIỆN</b>
                      </div>
                    }
                    key="1"
                  >
                    <div className="phap-ly-body">
                      <h4 className="section-title">
                        1. Thông tin hành chính & chuyên môn:
                      </h4>
                      <Row gutter={[24, 16]}>
                        {renderField("Số lưu trữ", "24/00582/QT", 6)}
                        {renderField("Mã y tế", "1900123456", 6)}
                        {renderField(
                          "Mã TTDV (Mã số BHXH)",
                          "79001 (BV Đa khoa TP)",
                          6,
                        )}
                        {renderField(
                          "Mã / Tên BS",
                          "BS0128 - Nguyễn Văn An",
                          6,
                        )}

                        {renderField("Ngày vào viện", "10/03/2026", 6)}
                        {renderField("Ngày ra viện", "17/03/2026", 6)}
                        {renderField("Ngày cấp giấy ra viện", "17/03/2026", 6)}
                        {renderField("Mã khoa", "K02 - Nội tổng hợp", 6)}

                        {renderField(
                          "Chẩn đoán ra viện",
                          "Viêm dạ dày cấp tính (K29.1)",
                          24,
                        )}
                        {renderField(
                          "Phương pháp điều trị",
                          "Nội khoa, kháng sinh, điều chỉnh chế độ ăn",
                          24,
                        )}
                        {renderField(
                          "Ghi chú",
                          "Tái khám sau 2 tuần hoặc khi có dấu hiệu đau bụng dữ dội",
                          24,
                        )}
                      </Row>

                      <h4 className="section-title mt-32">
                        2. Thông tin Bảo hiểm & Người thân (Thường cho bệnh nhi
                        hoặc sản khoa):
                      </h4>
                    </div>
                  </Panel>
                </Collapse>

                <Collapse
                  defaultActiveKey={["group2"]}
                  expandIconPosition="end"
                  className="group-phap-ly-collapse"
                >
                  <Panel
                    header={
                      <div className="group-header">
                        <ReconciliationOutlined style={{marginRight: 8}} />
                        <b>GIẤY CHỨNG NHẬN NGHỈ DƯỠNG THAI</b>
                      </div>
                    }
                    key="group2"
                  >
                    <div className="phap-ly-body">
                      <h4 className="section-title">
                        1. Thông tin người nuôi dưỡng (Người mẹ):
                      </h4>
                      <Row gutter={[24, 16]}>
                        {renderField("Họ và tên", "Nguyễn Thị Mai", 6)}
                        {renderField("Ngày sinh", "17/10/1986", 6)}
                        {renderField("Mã thẻ BHYT", "HT 2 01 0123456789", 6)}
                        {renderField("Mã số BHXH", "0123456789", 6)}

                        {renderField("Số CCCD/HC", "001186001234", 8)}
                        {renderField("Ngày cấp CCCD/HC", "20/05/2021", 6)}
                        {renderField(
                          "Nơi cấp CCCD/HC",
                          "Cục Cảnh sát QLHC về trật tự xã hội",
                          10,
                        )}

                        {renderField("Dân tộc", "Tày", 4)}
                        {renderField("Mã quốc tịch", "VN", 5)}
                        {renderField("Mã tỉnh", "01", 5)}
                        {renderField("Mã huyện", "006", 5)}
                        {renderField("Mã xã", "00181", 5)}

                        {renderField(
                          "Nơi cư trú của người nuôi dưỡng",
                          "123 Đường Láng, Đống Đa, Hà Nội",
                          24,
                        )}
                      </Row>

                      <h4 className="section-title mt-32">
                        2. Thông tin về con & Lần sinh:
                      </h4>
                    </div>
                  </Panel>
                </Collapse>

                <Collapse
                  defaultActiveKey={["group3"]}
                  expandIconPosition="end"
                  className="group-phap-ly-collapse"
                >
                  <Panel
                    header={
                      <div className="group-header">
                        <ReconciliationOutlined style={{marginRight: 8}} />
                        <b>GIẤY CHỨNG NHẬN NGHỈ VIỆC HƯỞNG BHXH</b>
                      </div>
                    }
                    key="group3"
                  >
                    <div className="phap-ly-body">
                      <h4 className="section-title">
                        1. Thông tin hành chính & chuyên môn:
                      </h4>
                      <Row gutter={[24, 16]}>
                        {renderField("Số chứng từ", "00012345", 6)}
                        {renderField("Số định danh chứng từ", "123456789", 6)}
                        {renderField("Mẫu số", "CT07", 6)}
                        {renderField("Số KCB", "2026031701", 6)}

                        {renderField("Ngày cấp chứng từ", "17/03/2026", 6)}
                        {renderField("Mã TTDV (Mã số BHXH)", "79001", 6)}
                        {renderField("Mã BS", "BS0128", 6)}
                        {renderField("Tên BS", "Nguyễn Văn An", 6)}
                        {renderField(
                          "Chẩn đoán ra viện",
                          "Viêm dạ dày cấp tính (K29.1)",
                          24,
                        )}

                        {renderField(
                          "Phương pháp điều trị",
                          "Nội khoa, kháng sinh, điều chỉnh chế độ ăn",
                          24,
                        )}
                      </Row>
                    </div>
                  </Panel>
                </Collapse>

                <Collapse
                  defaultActiveKey={["group4"]}
                  expandIconPosition="end"
                  className="group-phap-ly-collapse"
                >
                  <Panel
                    header={
                      <div className="group-header">
                        <ReconciliationOutlined style={{marginRight: 8}} />
                        <b>
                          GIẤY CHUYỂN TUYẾN / CHUYỂN CƠ SỞ KHÁM, CHỮA BỆNH BHYT
                        </b>
                      </div>
                    }
                    key="group4"
                  >
                    <div className="phap-ly-body">
                      <h4 className="section-title">
                        1. Thông tin hành chính:
                      </h4>
                      <Row gutter={[24, 16]}>

                        {renderField("Số hồ sơ", "HS-2026-001", 6)}
                        {renderField("Số sổ chuyển tuyến", "ST-9988", 6)}
                        {renderField("Số giấy chuyển tuyến", "GCT-5544", 6)}
                        {renderField("Mã / Tên cơ sở KBCB", "79001", 6)}


                        {renderField("Ngày vào", "10/03/2026", 6)}
                        {renderField("Ngày vào nội trú", "10/03/2026", 6)}
                        {renderField("Ngày ra", "17/03/2026", 6)}
                        {renderField("Mã TTDV (Mã số BHXH)", "79001", 6)}
                        {renderField(
                          "Mã / Tên nơi đi",
                          "79001 - Bệnh viện Đa khoa TP",
                          12,
                        )}
                        {renderField(
                          "Mã / Tên nơi đến",
                          "79015 - Bệnh viện Chợ Rẫy",
                          12,
                        )}

                        {renderField(
                          "Lý do chuyển tuyến",
                          "Bệnh vượt quá khả năng điều trị của tuyến cơ sở",
                          12,
                        )}
                        {renderField(
                          "Phương tiện vận chuyển",
                          "Xe cứu thương",
                          12,
                        )}
                      </Row>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ),
          },
          {
            key: "8",
            label: (
              <span>
                <ExperimentOutlined /> Đơn thuốc
              </span>
            ),
            children: (
              <div className="tab-content-don-thuoc">
                <div className="don-thuoc-table-wrapper">
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={false}
                  />
                </div>
                <div className="don-thuoc-result-detail">
                  <Collapse
                    ghost
                    expandIconPosition="end"
                    className="result-collapse"
                  >
                    <Panel
                      header={
                        <div className="result-header">
                          <b>KẾT QUẢ CHI TIẾT</b>
                        </div>
                      }
                    >
                      <p>Nội dung đơn thuốc...</p>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
