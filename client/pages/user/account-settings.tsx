import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Collapse, Form, notification, Spin } from "antd";

import Axios from "../../axios-url";
import { AuthContext } from "../../context/AuthContext";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";
import ChangeEmailForm from "../../components/forms/ChangeEmailForm";
import UserRoute from "../../components/routes/UserRoute";

const AccountSettings: NextPage = () => {
  const { Panel } = Collapse;
  const router = useRouter();
  const [panelKey, setPanelKey] = useState<string | string[]>();
  const [loading, setLoading] = useState(false);
  const [changeEmailError, setChangeEmailError] = useState("");
  const [successEmailChange, setSuccessEmailChange] = useState(false);
  const [changeEmailForm] = Form.useForm();
  const [changePassError, setChangePassError] = useState("");
  const [successPassChange, setSuccessPassChange] = useState(false);
  const [changePassForm] = Form.useForm();
  const { csrfToken, accessToken, state, dispatch, getTokens } =
    useContext(AuthContext);

  useEffect(() => {
    if (successPassChange) {
      notification.info({ message: "Password is changed successfully" });
    }
    if (successEmailChange) {
      notification.info({
        message: "Email is changed successfully and confirmation email is sent",
      });
    }
  }, [successPassChange, successEmailChange]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    const { data } = await Axios.get("/user/logout");
    toast(data.data);
    router.push("/login");
  };
  const onFinishEmailChange = (values: any) => {
    if (values) {
      const { email } = values;
      changeEmail(email, state?.user?.id, accessToken);
    }
  };

  const changePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string,
    loggedIn: boolean,
    accessToken?: string
  ) => {
    try {
      setLoading(true);
      Axios.defaults.headers.patch["X-CSRF-Token"] = csrfToken;
      const { data } = await Axios.patch(
        "/user/changePassword",
        {
          userId,
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setLoading(false);
      setChangePassError("");
      if (!loggedIn) {
        setSuccessPassChange(true);
        await logout();
      }
      setSuccessPassChange(true);
      changePassForm.resetFields();
    } catch (error: any) {
      const { data } = error.response;
      setLoading(false);
      setSuccessPassChange(false);
      setChangePassError(data.data.error);
    }
  };

  const changeEmail = async (email: string, userId: string, token?: string) => {
    try {
      setLoading(true);
      Axios.defaults.headers.patch["X-CSRF-Token"] = csrfToken;
      const { data } = await Axios.patch(
        "/user/changeEmail",
        {
          email,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setChangeEmailError("");
      setSuccessEmailChange(true);
      changeEmailForm.resetFields();
      await getTokens();
    } catch (error: any) {
      const { data } = error.response;
      setLoading(false);
      setSuccessEmailChange(false);
      setChangeEmailError(data.data.error);
    }
  };
  const onFinishPassChange = async (values: any) => {
    if (values) {
      const { oldPassword, newPassword, loggedIn } = values;
      await changePassword(
        state?.user?.id,
        oldPassword,
        newPassword,
        loggedIn,
        accessToken
      );
    }
  };
  return (
    <>
      <UserRoute>
        <div className="jumbotron text-center bg-primary square">
          <h1 style={{ color: "white" }}>Account Settings</h1>
          <p className="lead">This is your account's different settings</p>
        </div>
        <div>
          <Collapse
            defaultActiveKey={panelKey}
            accordion
            onChange={(key) => {
              setPanelKey(key);
            }}
          >
            <Panel header="Change Password" key="1">
              <ChangePasswordForm
                form={changePassForm}
                loading={loading}
                changeError={changePassError}
                onFinish={onFinishPassChange}
              />
            </Panel>
            <Panel header="Change Email" key="2">
              <ChangeEmailForm
                form={changeEmailForm}
                loading={loading}
                changeError={changeEmailError}
                onFinish={onFinishEmailChange}
              />
            </Panel>
            <Panel header="Delete Account" key="3">
              {/* <DeleteForm
                loading={loading}
                deleteError={deleteError}
                onFinish={onFinishDelete}
              /> */}
            </Panel>
          </Collapse>
        </div>
      </UserRoute>
    </>
  );
};

export default AccountSettings;
