import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { BeatLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import Error from "./Error";
import UseFetch from "@/Hook/UseFetch";
import { login } from "@/DB/ApiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlstate } from "@/Context/Context";

const Login = () => {
  const { userfn } = urlstate();
  const [erros, setErrors] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");

  const [formData, setformdata] = useState({
    email: "",
    password: "",
  });

  const { loading, error, fn: fnLogin, data } = UseFetch(login, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ""}`);
      userfn();
    }
  }, [data]);

  const handleinputchange = (e) => {
    const { name, value } = e.target;
    setformdata((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const HandleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (error) {
      const newError = {};
      error?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleinputchange}
            />
          </div>
          {erros.email && <Error message={erros.email} />}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleinputchange}
            />
          </div>
          {erros.password && <Error message={erros.password} />}
        </CardContent>
        <CardFooter>
          <Button onClick={HandleLogin}>
            {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
