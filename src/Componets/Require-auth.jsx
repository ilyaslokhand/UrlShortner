import { urlstate } from "@/Context/Context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Requireauth = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenicated } = urlstate();

  useEffect(() => {
    if (!isAuthenicated && loading == false) {
      navigate("/auth");
    }
  }, [isAuthenicated, loading]);
  if (loading) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }
  if (isAuthenicated) {
    return children;
  }
};

export default Requireauth;
