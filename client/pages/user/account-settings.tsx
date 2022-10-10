import { NextPage } from "next";

import UserRoute from "../../components/routes/UserRoute";

const AccountSettings: NextPage = () => {
  return (
    <>
      <UserRoute>
        <div className="jumbotron text-center bg-primary square">
          <h1 style={{ color: "white" }}>Account Settings</h1>
          <p className="lead">This is your account's different settings</p>
        </div>
        <div></div>
      </UserRoute>
    </>
  );
};

export default AccountSettings;
