import { GetCurrentuser } from "@/DB/ApiAuth";
import UseFetch from "@/Hook/UseFetch";
import { createContext, useEffect } from "react";
import { useContext } from "react";

const urlcontext = createContext();

const UrlProvider = ({ children }) => {
  const {
    data: userdata,
    loading,
    error,
    fn: userfn,
  } = UseFetch(GetCurrentuser);

  const isAuthenicated = userdata?.role === "authenticated";

  useEffect(() => {
    userfn();
  }, []);

  return (
    <urlcontext.Provider
      value={{ loading, error, isAuthenicated, userdata, userfn }}
    >
      {children}
    </urlcontext.Provider>
  );
};

export const urlstate = () => {
  return useContext(urlcontext);
};

export default UrlProvider;
