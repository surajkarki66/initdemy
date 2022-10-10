import Cookie from "js-cookie";
import {
  useReducer,
  createContext,
  ReactFragment,
  FC,
  useEffect,
  useState,
  useCallback,
} from "react";

import Axios from "../axios-url";
import { AuthContextType, User } from "../types/types";

type Props = {
  children: ReactFragment;
};

const initialState = {
  user: null,
};

const AuthContext = createContext({} as AuthContextType);

const rootReducer = (
  state: { user: User },
  action: { type: any; payload?: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

const AuthContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const [csrfToken, setCsrfToken] = useState("");
  const [accessToken, setAccessToken] = useState(Cookie.get("accessToken"));

  const getTokens = useCallback(async () => {
    const csrfResponse = await Axios.get("/user/csrf-token");
    setCsrfToken(csrfResponse.data.csrfToken);
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(String(localStorage.getItem("user"))),
    });
    const { data } = await Axios.get("/user/loggedIn");
    setAccessToken(data);
  }, []);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  return (
    <AuthContext.Provider
      value={{ state, dispatch, csrfToken, accessToken, setAccessToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
