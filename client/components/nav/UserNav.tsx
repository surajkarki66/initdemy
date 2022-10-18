import { FC, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Axios from "../../axios-url";
import { AuthContext } from "../../context/AuthContext";

const UserNav: FC = () => {
  const router = useRouter();
  const location = router.pathname;
  const { dispatch, csrfToken } = useContext(AuthContext);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    Axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
    const { data } = await Axios.get("/user/logout");
    toast(data.data);
    router.push("/login");
  };

  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href="/user">
        <a className={location === "/user" ? "nav-link active" : "nav-link"}>
          Dashboard
        </a>
      </Link>
      <Link href="/user/account-settings">
        <a
          className={
            location === "/user/account-settings"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Account Settings
        </a>
      </Link>
      <a className="nav-link" onClick={logout}>
        Logout
      </a>
    </div>
  );
};

export default UserNav;
