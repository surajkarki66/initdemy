import React, { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { AuthContext } from "../context/AuthContext";

const TopNav: React.FC = () => {
  const [current, setCurrent] = useState("");
  const { state } = useContext(AuthContext);
  const { Item } = Menu;
  const { user } = state;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process.browser && window.location.pathname]);

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

      {user === null && (
        <>
          <Item
            onClick={(e) => setCurrent(e.key)}
            key="/login"
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item
            onClick={(e) => setCurrent(e.key)}
            key="/register"
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}
      {user !== null && (
        <Item key="/me" icon={<CoffeeOutlined />}>
          <Link href="/user">{user && user.firstName + " " + user.lastName}</Link>
        </Item>
      )}
    </Menu>
  );
};

export default TopNav;
