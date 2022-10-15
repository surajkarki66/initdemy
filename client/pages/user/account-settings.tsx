import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Collapse, Form, notification } from "antd";

import Axios from "../../axios-url";
import { AuthContext } from "../../context/AuthContext";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";
import ChangeEmailForm from "../../components/forms/ChangeEmailForm";
import DeleteForm from "../../components/forms/DeleteForm";
import ChangeNameForm from "../../components/forms/ChangeNameForm";
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
  const [deleteError, setDeleteError] = useState("");
  const [successPassChange, setSuccessPassChange] = useState(false);
  const [successNameChange, setSuccessNameChange] = useState(false);
  const [changeNameError, setChangeNameError] = useState("");
  const [changePassForm] = Form.useForm();
  const [changeNameForm] = Form.useForm();
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
    if (successNameChange) {
      notification.info({
        message: "Full Name is changed successfully",
      });
    }
  }, [successPassChange, successEmailChange, successNameChange]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    const { data } = await Axios.get("/user/logout");
    toast(data.data);
    router.push("/login");
  };
  const onFinishEmailChange = async (values: any) => {
    if (values) {
      const { email } = values;
      await changeEmail(email, state?.user?.id, accessToken);
    }
  };
  const changeEmail = async (email: string, userId: string, token?: string) => {
    try {
      setLoading(true);
      Axios.defaults.headers.patch["X-CSRF-Token"] = csrfToken;
      await Axios.patch(
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
      await Axios.patch(
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
  const onFinishDelete = async (values: any) => {
    if (values) {
      const { password } = values;
      await deleteAccount(password, state?.user?.id, accessToken);
    }
  };
  const deleteAccount = async (
    password: string,
    userId: string,
    token?: string
  ) => {
    try {
      setLoading(true);
      Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
      await Axios.post(
        "/user/deleteUser",
        { userId, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setDeleteError("");
      router.push("/");
      await logout();
    } catch (error: any) {
      const { data } = error.response;
      setLoading(false);
      setDeleteError(data.data.error);
    }
  };
  const onFinishNameChange = async (values: any) => {
    if (values) {
      const { firstName, lastName } = values;
      await changeName(state?.user?.id, firstName, lastName, accessToken);
    }
  };
  const changeName = async (
    userId: string,
    firstName: string,
    lastName: string,
    accessToken?: string
  ) => {
    try {
      setLoading(true);
      Axios.defaults.headers.patch["X-CSRF-Token"] = csrfToken;
      await Axios.patch(
        `/user/changeUserDetails/${userId}`,
        {
          firstName,
          lastName,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setLoading(false);
      setChangeNameError("");
      setSuccessNameChange(true);
      changeNameForm.resetFields();
    } catch (error: any) {
      const { data } = error.response;
      setLoading(false);
      setSuccessNameChange(false);
      setChangeNameError(data.data.error);
    }
  };

  return (
    <>
      <UserRoute>
        <div className="jumbotron text-center bg-primary square">
          <h1 style={{ color: "white" }}>Account Settings</h1>
          <p className="lead">This is your account&apos;s different settings</p>
        </div>
        <div>
          <Collapse
            defaultActiveKey={panelKey}
            accordion
            onChange={(key) => {
              setPanelKey(key);
            }}
          >
            <Panel header="Change Name" key="1">
              <ChangeNameForm
                form={changeNameForm}
                loading={loading}
                changeError={changeNameError}
                onFinish={onFinishNameChange}
              />
            </Panel>
            <Panel header="Change Password" key="2">
              <ChangePasswordForm
                form={changePassForm}
                loading={loading}
                changeError={changePassError}
                onFinish={onFinishPassChange}
              />
            </Panel>
            <Panel header="Change Email" key="3">
              <ChangeEmailForm
                form={changeEmailForm}
                loading={loading}
                changeError={changeEmailError}
                onFinish={onFinishEmailChange}
              />
            </Panel>
            <Panel header="Delete Account" key="4">
              <DeleteForm
                loading={loading}
                deleteError={deleteError}
                onFinish={onFinishDelete}
              />
            </Panel>
          </Collapse>
        </div>
      </UserRoute>
    </>
  );
};

export default AccountSettings;
