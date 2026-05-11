import LayoutDefault from "../layouts/LayoutDefault";
import LoginForm from "../Login_Logout/LoginForm";
import RegisterForm from "../Login_Logout/RegisterForm";
import ProtectedRoute from "../Login_Logout/ProtectedRoute";
import DoanhTHu from "../pages/DoanhThu";
import HoSoSucKHoe from "../pages/HoSoSucKhoe";
import DieuTriBenhNhan from "../pages/DieuTriBenhNhan";
import BenhNhanXuatVien from "../pages/BenhNhanXuatVien/BenhNhanXuatVien";
import HoSoBenhAn from "../pages/HoSoBenhAn/HoSoBenhAn";
import HoSoBenhNhan from "../pages/HoSoBenhNhan/HoSoBenhNhan";
import ThemBenhNhan from "../pages/ThemBenhNhan/ThemBenhNhan";

export const routers = [
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutDefault />
      </ProtectedRoute>
    ),
    handle: {breadcrumb: "Trang chủ"},
    children: [
      {
        path: "doanh-thu",
        element: <DoanhTHu />,
        handle: {breadcrumb: "Doanh Thu"},
      },
      {
        path: "ho-so-suc-khoe",
        element: <HoSoSucKHoe />,
        handle: {breadcrumb: "Hồ Sơ Sức Khỏe"},
      },
      {
        path: "dieu-tri-benh-nhan",
        element: <DieuTriBenhNhan />,
        handle: {breadcrumb: "Điều Trị Bệnh Nhân"},
      },
      {
        path: "benh-nhan-xuat-vien",
        element: <BenhNhanXuatVien />,
        handle: {breadcrumb: "Bệnh Nhân Xuất Viện"},
      },
      {
        path: "ho-so-benh-an",
        element: <HoSoBenhAn />,
        handle: {breadcrumb: "Hồ Sơ Bệnh Án"},
      },
      {
        path: "ho-so-benh-nhan",
        element: <HoSoBenhNhan />, 
        handle: {breadcrumb: "Hồ Sơ Bệnh Nhân"},
      },{
        path: "them-benh-nhan",
        element: <ThemBenhNhan />,
        handle: {breadcrumb: "Thêm Bệnh Nhân"},
      }
    ],
  },
];
