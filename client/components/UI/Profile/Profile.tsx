import React from "react";
import { Row, Col, Button } from "antd";
import moment from "moment";

import { ProfileProps } from "../../../types/types";
import { SyncOutlined } from "@ant-design/icons";
import ProfilePic from "./Avatar/ProfilePic";
import ProfilePicChanger from "../../ProfilePicChanger";

const Profile: React.FC<ProfileProps> = ({
  user,
  avatar,
  setAvatar,
  loading,
  disableBtn,
  profileActivateHandler,
}) => {
  return (
    <div>
      <Row className="profileContainer">
        <Col md={6} style={{ marginLeft: "5%" }}>
          <h6>
            First Name: <b>{user?.firstName}</b>{" "}
          </h6>
          <h6>
            Last Name: <b>{user?.lastName}</b>{" "}
          </h6>
          <h6>
            Email: <b>{user?.email}</b>{" "}
          </h6>
          <h6>
            Account: <b>{user?.isActive ? "active" : "not active"}</b>{" "}
          </h6>
          <h6>
            Role: <b style={{ textTransform: "lowercase" }}>{user?.role}</b>{" "}
          </h6>
          <h6>
            Joined:
            <b>{moment(user?.createdAt).format("MMMM Do YYYY, h:mm a")}</b>{" "}
          </h6>

          {!user?.isActive && (
            <div style={{ fontStyle: "italic", marginTop: "30px" }}>
              <h6>Account is not activated yet</h6>
              <Button
                type="primary"
                onClick={(e) => profileActivateHandler(e)}
                disabled={disableBtn}
              >
                {loading ? <SyncOutlined spin /> : "Activate"}
              </Button>
            </div>
          )}
        </Col>
        <Col style={{ marginLeft: "12%" }}>
          <ProfilePic user={user} avatar={avatar} />
          <br />
          <br />
          <ProfilePicChanger setAvatar={setAvatar} />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
