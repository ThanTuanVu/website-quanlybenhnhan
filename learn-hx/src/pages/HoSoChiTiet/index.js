import {Card, Row, Col, Avatar, Tabs, Collapse, Menu, Table} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./TienSuTab.js";
import "./HoSoChiTiet.scss";
import {TienSuTab} from "./TienSuTab.js";
import LichSuKcb from "./LichSuKcb.js";
import {useState} from "react";
import KhamSucKhoe from "./KhamSucKhoe.js";
import TiemChung from "./TiemChung.js";
import BenhLaoHiv from "./BenhLaoHiv.js";
import GiamDinhYKhoa from "./GiamDinhYKhoa.js";

const {Panel} = Collapse;

const columns = [
  {
    title: "STT",
    dataIndex: "key",
    align: "center",
  },
  {
    title: "Loại quan hệ",
    dataIndex: "qh",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
  },
  {
    title: "Số BHXH",
    dataIndex: "bhxh",
  },
];
const dataTable = [
  {
    key: "1",
    name: "Thân Tuấn Vũ",
    qh: "Bố",
    bhxh: "0123676234",
  },
  {
    key: "2",
    name: "Vũ Thị Dung",
    qh: "Mẹ",
    bhxh: "0123676234",
  },
  {
    key: "3",
    name: "Trần Văn Hùng",
    qh: "Con",
    bhxh: "0123676234",
  },
  {
    key: "4",
    name: "Nguyễn Bích Phượng",
    qh: "Vợ",
    bhxh: "0123676234",
  },
  {
    key: "5",
    name: "Thân Thị Khánh Nhi",
    qh: "Cha",
    bhxh: "0123676234",
  },
];

export default function HoSoChiTiet({data, onBack}) {
  const [activeMenu, setActiveMenu] = useState("1");

  return (
    <div style={{padding: 16}}>
      <div style={{display: "flex", alignItems: "center", marginBottom: 16}}>
        <ArrowLeftOutlined
          style={{marginRight: 8, cursor: "pointer"}}
          onClick={onBack}
        />
        <h3 style={{margin: 0}}>
          Chi tiết hồ sơ sức khỏe / <b>{data?.hoTen}</b>
        </h3>
      </div>

      <Card style={{marginBottom: 16}}>
        <Row gutter={24} wrap={false} align="middle">
          <Col flex="none">
            <Avatar
              shape="square"
              size={120}
              src="https://inanhducanh.com//img/upload/images/files/2x3%20%E1%BA%A3nh%20th%E1%BA%BB%20%C4%91%E1%BA%A3ng.jpg"
              style={{border: "1px solid #ddd", objectFit: "cover"}}
            />
          </Col>

          <Col flex="auto">
            <Row gutter={[24, 12]}>
              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, color: "#888"}}>Họ và tên</div>
                  <div style={{fontWeight: 600}}>{data?.hoTen}</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, color: "#888"}}>CCCD</div>
                  <div>{data?.cccd}</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, color: "#888"}}>Nhóm máu</div>
                  <div>Nhóm O</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, color: "#888"}}>Ngày sinh</div>
                  <div>{data?.ngaySinh}</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, color: "#888"}}>Số sổ BHXH</div>
                  <div>QN1235567899</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, color: "#888"}}>Dân tộc</div>
                  <div>Tày</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, color: "#888"}}>Giới tính</div>
                  <div>{data?.gioiTinh}</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, flexShrink: 0, color: "#888"}}>
                    Số điện thoại
                  </div>
                  <div>095.124.6797</div>
                </div>
              </Col>

              <Col span={8}>
                <div style={{display: "flex"}}>
                  <div style={{minWidth: 130, flexShrink: 0, color: "#888"}}>
                    Số ngày nghỉ phép
                  </div>
                  <div style={{color: "red", fontWeight: 600}}>12 ngày</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Row gutter={16}>
        <Col span={5}>
          <Card bodyStyle={{padding: 0}}>
            <Menu
              selectedKeys={[activeMenu]}
              onSelect={(e) => setActiveMenu(e.key)}
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "Hồ sơ & Tiền sử",
                },
                {
                  key: "2",
                  icon: <ProfileOutlined />,
                  label: "Lịch sử KCB",
                },
                {
                  key: "3",
                  icon: <ProfileOutlined />,
                  label: "Khám sức khỏe",
                },
                {
                  key: "4",
                  icon: <ProfileOutlined />,
                  label: "Tiêm chủng",
                },
                {
                  key: "5",
                  icon: <ProfileOutlined />,
                  label: "Bệnh HIV & Lao",
                },
                {
                  key: "6",
                  icon: <TeamOutlined />,
                  label: "Giám định y khoa",
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={19}>
          {activeMenu === "1" && (
            <Card>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: "1",
                    label: "Thông tin hành chính",
                    children: (
                      <Collapse defaultActiveKey={false}>
                        <Panel header="ĐỊA CHỈ HÀNH CHÍNH & THẺ BHYT" key="1">
                          <div style={{marginBottom: 12}}>
                            <div style={{color: "#888", marginBottom: 4}}>
                              Thường trú
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid #ddd",
                                paddingBottom: 8,
                                paddingLeft: 10,
                              }}
                            >
                              Số 103-105 Nguyễn Tuân, Phường Thanh Xuân, Thành
                              phố Hà Nội, Việt Nam
                            </div>
                          </div>

                          <div style={{marginBottom: 12}}>
                            <div style={{color: "#888", marginBottom: 4}}>
                              Tạm trú
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid #ddd",
                                paddingBottom: 8,
                                paddingLeft: 10,
                              }}
                            >
                              Số 103-105 Nguyễn Tuân, Phường Thanh Xuân, Thành
                              phố Hà Nội, Việt Nam
                            </div>
                          </div>

                          <Row gutter={16} style={{marginBottom: 12}}>
                            <Col span={6}>
                              <div style={{color: "#888", marginBottom: 4}}>
                                Số thẻ BHYT
                              </div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingBottom: 6,
                                  paddingLeft: 10,
                                }}
                              >
                                024548454245
                              </div>
                            </Col>

                            <Col span={6}>
                              <div style={{color: "#888", marginBottom: 4}}>
                                Thời hạn thẻ
                              </div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingBottom: 6,
                                  paddingLeft: 10,
                                }}
                              >
                                01/07/2027
                              </div>
                            </Col>

                            <Col span={6}>
                              <div style={{color: "#888", marginBottom: 4}}>
                                Đến ngày
                              </div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingBottom: 6,
                                  paddingLeft: 10,
                                }}
                              >
                                01/07/2030
                              </div>
                            </Col>

                            <Col span={6}>
                              <div style={{color: "#888", marginBottom: 4}}>
                                Mã
                              </div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingBottom: 6,
                                  paddingLeft: 10,
                                }}
                              >
                                01-123
                              </div>
                            </Col>
                          </Row>

                          <div>
                            <div style={{color: "#888", marginBottom: 4}}>
                              Nơi đăng ký KCB ban đầu
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid #ddd",
                                paddingBottom: 8,
                                paddingLeft: 10,
                              }}
                            >
                              Số 103-105 Nguyễn Tuân, Phường Thanh Xuân, Thành
                              phố Hà Nội, Việt Nam
                            </div>
                          </div>
                        </Panel>

                        <Panel header="THÔNG TIN NGHỀ NGHIỆP" key="2">
                          <Row gutter={16}>
                            <Col span={6}>
                              <div style={{color: "#888"}}>Nghề nghiệp</div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingLeft: "15px",
                                }}
                              >
                                Công an
                              </div>
                            </Col>
                            <Col span={6}>
                              <div style={{color: "#888"}}>Chức vụ</div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingLeft: "15px",
                                }}
                              >
                                Trưởng phòng
                              </div>
                            </Col>
                            <Col span={6}>
                              <div style={{color: "#888"}}>Cấp bậc</div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingLeft: "15px",
                                }}
                              >
                                Đại tá
                              </div>
                            </Col>
                            <Col span={6}>
                              <div style={{color: "#888"}}>Đơn vị công tác</div>
                              <div
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  paddingLeft: "15px",
                                }}
                              >
                                Phòng PX01
                              </div>
                            </Col>
                          </Row>
                        </Panel>

                        <Panel header="THÔNG TIN THÂN NHÂN" key="3">
                          <Table
                            className="table_thannhan"
                            columns={columns}
                            dataSource={dataTable}
                            pagination={false}
                          />
                        </Panel>
                      </Collapse>
                    ),
                  },
                  {
                    key: "2",
                    label: "Tiền sử",
                    children: <TienSuTab />,
                  },
                ]}
              />
            </Card>
          )}
          {activeMenu === "2" && <LichSuKcb />}
          {activeMenu === "3" && <KhamSucKhoe />}
          {activeMenu === "4" && <TiemChung />}
          {activeMenu === "5" && <BenhLaoHiv />}
          {activeMenu === "6" && <GiamDinhYKhoa />}
        </Col>
      </Row>
    </div>
  );
}
