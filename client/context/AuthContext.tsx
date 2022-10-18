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
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(Cookie.get("accessToken"));
  const [fullName, setFullName] = useState("");

  const getTokens = useCallback(async () => {
    try {
      const csrfResponse = await Axios.get("/user/csrf-token");
      setCsrfToken(csrfResponse.data.csrfToken);
      const res = await Axios.get("/user/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch({
        type: "LOGIN",
        payload: res?.data?.data,
      });
      setFullName(res.data.data.firstName + " " + res.data.data.lastName);
      const { data } = await Axios.get("/user/loggedIn");
      setAccessToken(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        csrfToken,
        accessToken,
        setAccessToken,
        getTokens,
        loading,
        setLoading,
        fullName,
        setFullName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
