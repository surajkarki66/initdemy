import React from "react";
import { Form, Input, Button, FormInstance } from "antd";

type Props = {
  loading: boolean;
  changeError: string;
  form: FormInstance<any>;
  onFinish: (value: any) => void;
};

const ChangeNameForm: React.FC<Props> = (props) => {
  const { loading, changeError, onFinish, form } = props;
  return (
    <Form
      form={form}
      style={{
        minWidth: "405px",
        fontWeight: "bold",
      }}
      name="change_name"
      className="change-form"
      onFinish={onFinish}
    >
      {changeError !== "" && <h4 style={{ color: "red" }}>{changeError}</h4>}
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your first name",
          },
          { min: 2, message: "First Name should be more than 2 character" },
          { max: 32, message: "First Name should be less than 32 character" },
        ]}
      >
        <Input name="firstName" placeholder="Enter First Name" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input your last name",
          },
          { min: 2, message: "Last Name should be more than 2 character" },
          { max: 32, message: "Last Name should be less than 32 character" },
        ]}
      >
        <Input name="lastName" placeholder="Enter Last Name" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="change-name-button"
        >
          {loading ? "" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangeNameForm;
