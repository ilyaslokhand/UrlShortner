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
import { signup } from "@/DB/ApiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = () => {
  const [erros, setErrors] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");

  const [formData, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const { loading, error, fn: fnSignup, data } = UseFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ""}`);
    }
  }, [error, loading]);

  const handleinputchange = (e) => {
    const { name, value, files } = e.target;
    setformdata((prevstate) => ({
      ...prevstate,
      [name]: files ? files[0] : value,
    }));
  };

  const HandleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile pic is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
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
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account if you haven&rsquo;t already
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleinputchange}
            />
          </div>
          {erros.name && <Error message={erros.name} />}
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
          <div className="space-y-1">
            <input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleinputchange}
            />
          </div>
          {erros.profile_pic && <Error message={erros.profile_pic} />}
        </CardContent>
        <CardFooter>
          <Button onClick={HandleSignup}>
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
