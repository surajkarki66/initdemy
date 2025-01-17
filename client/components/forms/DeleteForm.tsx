import React from "react";
import { Form, Input, Button } from "antd";

type Props = {
  loading: boolean;
  deleteError: string;
  onFinish: (value: any) => void;
};

const DeleteForm: React.FC<Props> = (props) => {
  const { loading, deleteError, onFinish } = props;
  return (
    <Form
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="delete_account"
      className="delete-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {deleteError !== "" && <h4 style={{ color: "red" }}>{deleteError}</h4>}
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { min: 6, message: "Password should be more than 5 character" },
          {
            pattern: /[A-Z]/,
            message: "Password must contain an uppercase",
          },
          { pattern: /[0-9]/, message: "Password must contain a number" },
        ]}
        hasFeedback
      >
        <Input.Password name="password" placeholder="Enter Password" />
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "red" }}
        >
          {loading ? "" : "Delete"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeleteForm;
