import {useState, useMemo} from "react";
import {Table, Input, Select, Button, ConfigProvider, Tabs} from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  HomeOutlined,
  DownOutlined,
} from "@ant-design/icons";
import HoSoChiTiet from "../HoSoChiTiet";

const rawData = [
  {
    key: "1",
    cccd: "001095001234",
    hoTen: "Nguyễn Văn Quyết",
    ngaySinh: "20/05/1985",
    gioiTinh: "Nam",
    ngheNghiep: "Cán bộ",
    donVi: "Phòng PX01",
  },
  {
    key: "2",
    cccd: "001095005678",
    hoTen: "Hán Thị Lan",
    ngaySinh: "15/10/1990",
    gioiTinh: "Nữ",
    ngheNghiep: "Chiến sĩ",
    donVi: "Phòng PV03",
  },
  {
    key: "3",
    cccd: "001457896547",
    hoTen: "Bùi Thị Mận",
    ngaySinh: "01/01/2000",
    gioiTinh: "Nữ",
    ngheNghiep: "Chiến sĩ nghĩa vụ",
    donVi: "PPKQ",
  },
  {
    key: "4",
    cccd: "005489623265",
    hoTen: "Lùng Thanh Dan",
    ngaySinh: "02/02/1996",
    gioiTinh: "Nam",
    ngheNghiep: "Chiến sĩ",
    donVi: "Phòng HC01",
  },
];

const donViOptions = [...new Set(rawData.map((d) => d.donVi))].map((v) => ({
  label: v,
  value: v,
}));

const ngheOptions = [...new Set(rawData.map((d) => d.ngheNghiep))].map((v) => ({
  label: v,
  value: v,
}));

export default function DanhSachCBCS() {
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState("");
  const [donVi, setDonVi] = useState(null);
  const [nghe, setNghe] = useState(null);
  const [activeKey, setActiveKey] = useState("1");
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () =>
      rawData.filter((r) => {
        const matchSearch =
          !search ||
          r.hoTen.toLowerCase().includes(search.toLowerCase()) ||
          r.cccd.includes(search);
        const matchDonVi = !donVi || r.donVi === donVi;
        const matchNghe = !nghe || r.ngheNghiep === nghe;
        return matchSearch && matchDonVi && matchNghe;
      }),
    [search, donVi, nghe],
  );

  const columns = [
    {title: "CCCD", dataIndex: "cccd"},
    {title: "Họ và tên", dataIndex: "hoTen"},
    {title: "Ngày sinh", dataIndex: "ngaySinh"},
    {title: "Giới tính", dataIndex: "gioiTinh"},
    {title: "Nghề nghiệp", dataIndex: "ngheNghiep"},
    {title: "Đơn vị", dataIndex: "donVi"},
    {
      title: "Thao tác",
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelected(record);
            setView("detail");
          }}
        >
          Xem
        </Button>
      ),
    },
  ];

  const renderContent = () => (
    <div style={{padding: "20px 24px"}}>
      <h2 style={{marginBottom: 16, color: "blue"}}>Danh sách CBCS</h2>

      <div
        style={{display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap"}}
      >
        <Input
          placeholder="Nhập tên CBCS hoặc CCCD"
          prefix={<SearchOutlined />}
          style={{width: 240}}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onPressEnter={() => setSearch(inputVal)}
          allowClear
          onClear={() => {
            setInputVal("");
            setSearch("");
          }}
        />

        <Select
          placeholder="Tất cả đơn vị"
          style={{width: 160}}
          options={donViOptions}
          allowClear
          value={donVi}
          onChange={(v) => setDonVi(v ?? null)}
        />

        <Select
          placeholder="Tất cả nghề nghiệp"
          style={{width: 200}}
          options={ngheOptions}
          allowClear
          value={nghe}
          onChange={(v) => setNghe(v ?? null)}
        />

        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => setSearch(inputVal)}
        >
          Tìm kiếm
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        pagination={false}
        size="middle"
        bordered
      />
    </div>
  );

  const [tabs, setTabs] = useState([
    {
      key: "dropdown",
      label: <DownOutlined />,
      closable: false,
    },
    {
      key: "1",
      label: (
        <span>
          <HomeOutlined style={{marginRight: 6}} />
          Hồ sơ sức khỏe CBCS
        </span>
      ),
      closable: true,
    },
  ]);

  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      const newTabs = tabs.filter((t) => t.key !== targetKey);
      setTabs(newTabs);

      if (activeKey === targetKey) {
        const lastTab = newTabs[newTabs.length - 1];
        setActiveKey(lastTab ? lastTab.key : "dropdown");
      }

      if (targetKey === "1") {
        setView("list");
        setSelected(null);
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1a3c8f",
          borderRadius: 4,
        },
      }}
    >
      <Tabs
        type="editable-card"
        hideAdd
        activeKey={activeKey}
        onChange={(key) => {
          if (key !== "dropdown") setActiveKey(key);
        }}
        onEdit={onEdit}
        items={tabs.map((tab) => ({
          ...tab,
          children:
            tab.key === "1" ? (
              view === "list" ? (
                renderContent()
              ) : (
                <HoSoChiTiet data={selected} onBack={() => setView("list")} />
              )
            ) : null,
        }))}
      />
    </ConfigProvider>
  );
}
