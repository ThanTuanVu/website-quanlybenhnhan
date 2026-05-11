import {Form, Input, Button, Card, message} from "antd";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(
        `http://localhost:3000/users?username=${values.username}`,
      );
      const data = await res.json();

      if (data.length > 0) {
        message.error("Username đã tồn tại!");
        return;
      }

      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      form.resetFields();

      message.success("Đăng ký thành công!", 1, () => {
        navigate("/login", {replace: true});
      });
    } catch (error) {
      message.error("Lỗi đăng ký!");
    }
  };

  return (
    <Card title="Đăng ký" style={{width: 400, margin: "100px auto"}}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{required: true, message: "Vui lòng nhập username!"}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{required: true, message: "Vui lòng nhập password!"}]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>

        <div style={{marginTop: 16, textAlign: "center"}}>
          Đã có tài khoản?{" "}
          <span
            style={{color: "#1677ff", cursor: "pointer"}}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </span>
        </div>
      </Form>
    </Card>
  );
};

export default RegisterForm;
