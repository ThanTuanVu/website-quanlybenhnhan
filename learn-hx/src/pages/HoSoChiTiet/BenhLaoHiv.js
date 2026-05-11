import React from "react";
import {Collapse, Row, Col} from "antd";
import {ContainerOutlined} from "@ant-design/icons";
import "./BenhLaoHiv.scss";

const {Panel} = Collapse;

export default function BenhHivLao() {
  const renderField = (label, value, colSpan = 6) => (
    <Col span={colSpan}>
      <div className="field-label">{label}</div>
      <div className="field-value">{value || "........................"}</div>
    </Col>
  );

  return (
    <div className="hiv-lao-wrapper">
      <Collapse
        defaultActiveKey={["hiv"]}
        expandIconPosition="end"
        className="group-medical-collapse"
      >
        <Panel
          header={
            <div className="group-header">
              <ContainerOutlined style={{marginRight: 8}} />
              <b>HỒ SƠ BỆNH ÁN CHĂM SÓC VÀ ĐIỀU TRỊ HIV/AIDS</b>
            </div>
          }
          key="hiv"
        >
          <div className="medical-body">
            <h4 className="section-title">1. Thông tin bệnh nhân:</h4>
            <Row gutter={[24, 16]}>
              {renderField("Mã thẻ BHYT", "GD4791234567890", 6)}
              {renderField("Số CCCD/Định danh", "001186001234", 6)}
              {renderField("Ngày sinh", "15/05/1990", 6)}
              {renderField("Giới tính", "Nam", 6)}

              {renderField("Họ tên", "Nguyễn Văn An", 6)}
              {renderField("Mã tỉnh cư trú", "01", 6)}
              {renderField("Mã huyện cư trú", "001", 6)}
              {renderField("Mã xã cư trú", "0001", 6)}

              {renderField(
                "Địa chỉ chi tiết",
                "123 Đường Lê Lợi, Quận 1, TP.HCM",
                24,
              )}
            </Row>

            <h4 className="section-title mt-32">
              2. Thông tin Chẩn đoán & Xét nghiệm HIV/AIDS:
            </h4>
            <Row gutter={[24, 16]}>
              {renderField("Ngày khẳng định HIV", "10/03/2025", 8)}
              {renderField("Ngày lấy mẫu XN TLVR", "10/03/2025", 8)}
              {renderField("Ngày có kết quả XN TLVR", "17/03/2026", 8)}

              {renderField(
                "Nơi lấy mẫu xét nghiệm",
                "79001 - Bệnh viện Đa khoa TP",
                12,
              )}
              {renderField(
                "Nơi xét nghiệm khẳng định",
                "79001 - Bệnh viện Đa khoa TP",
                12,
              )}

              {renderField(
                "Lý do XN tải lượng virus",
                "........................",
                12,
              )}
              {renderField(
                "Kết quả XN tải lượng virus",
                "........................",
                12,
              )}
            </Row>

            <h4 className="section-title mt-32">
              3. Thông tin Điều trị ARV & Phác đồ:
            </h4>
            <Row gutter={[24, 16]}>
              {renderField("Mã phác đồ ban đầu", "........................", 8)}
              {renderField(
                "Mã bậc phác đồ ban đầu",
                "........................",
                8,
              )}
              {renderField(
                "Ngày bắt đầu điều trị ARV",
                "........................",
                8,
              )}
            </Row>
          </div>
        </Panel>
      </Collapse>

      <Collapse
        defaultActiveKey={["lao"]}
        expandIconPosition="end"
        className="group-medical-collapse mt-16"
      >
        <Panel
          header={
            <div className="group-header">
              <ContainerOutlined style={{marginRight: 8}} />
              <b>HỒ SƠ QUẢN LÝ ĐIỀU TRỊ BỆNH LAO</b>
            </div>
          }
          key="lao"
        >
          <div className="medical-body">
            <h4 className="section-title">1. Thông tin bệnh nhân:</h4>
            <Row gutter={[24, 16]}>
              {renderField("Mã bệnh nhân", "BN998877", 6)}
              {renderField("Họ tên", "Nguyễn Văn An", 6)}
              {renderField("Số CCCD/Định danh", "001186001234", 6)}
              {renderField("Mã cơ sở KCB", "01002 (BV Phổi TW)", 6)}
            </Row>

            <h4 className="section-title mt-32">
              2. Thông tin Chẩn đoán & Phân loại:
            </h4>
            <Row gutter={[24, 16]}>
              {renderField("Vị trí giải phẫu", "1 - Lao phổi", 6)}
              {renderField("Tiền sử điều trị", "2 - Tái phát", 6)}
              {renderField("Bằng chứng vi khuẩn học", "1 - Dương tính", 6)}
              {renderField("Tình trạng kháng thuốc", "3 - Đa kháng thuốc", 6)}

              {renderField("Tình trạng nhiễm HIV", "1 - Lao/HIV dương tính", 6)}
            </Row>

            <h4 className="section-title mt-32">
              3. Thông tin Kế hoạch & Kết quả điều trị:
            </h4>
            <Row gutter={[24, 16]}>
              {renderField(
                "Loại hình điều trị",
                "3 - Điều trị lao kháng thuốc",
                6,
              )}
              {renderField("Phác đồ điều trị", "9 - Phác đồ C1a", 6)}
              {renderField("Ngày bắt đầu điều trị", "15/05/2025", 6)}
              {renderField("Ngày kết thúc điều trị", "15/11/2025", 6)}

              {renderField("Ngày xác nhận HIV", "15/05/2025", 6)}
              {renderField("Ngày bắt đầu thuốc ARV", "15/05/2025", 6)}
              {renderField("Ngày bắt đầu dự phòng CTX", "20/05/2025", 6)}
              {renderField("Đánh giá kết quả", "2 - Hoàn thành điều trị", 6)}
            </Row>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
