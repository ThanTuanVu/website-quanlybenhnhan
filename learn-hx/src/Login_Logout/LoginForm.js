import { Form, Input, Button, Card, message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const res = await fetch(
        `http://localhost:3000/users?username=${values.username}&password=${values.password}`
      );

      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("user", JSON.stringify(data[0]));

        form.resetFields();

        message.success("Đăng nhập thành công!", 1, () => {
          navigate("/", { replace: true });
        });
      } else {
        message.error("Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      message.error("Lỗi đăng nhập!");
    }
  };

  // --- Cấu hình style cho màn hình nền ---
  const backgroundStyle = {
    // Thay đường dẫn URL dưới đây bằng ảnh local của bạn nếu cần
    // Ví dụ: backgroundImage: `url('/images/hospital-bg.jpg')`
    backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Chiếm toàn bộ chiều cao màn hình
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={backgroundStyle}>
      <Card 
        title={<h2 style={{ textAlign: "center", margin: 0 }}>Đăng nhập</h2>} 
        style={{ 
          width: 400, 
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // Thêm đổ bóng để form nổi bật trên nền
          borderRadius: "8px"
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            // Sửa lại thuộc tính autoComplete cho chuẩn React
            autoComplete="off" 
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            autoComplete="off"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block>
            Đăng nhập
          </Button>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            Chưa có tài khoản?{" "}
            <span
              style={{ color: "#1677ff", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;