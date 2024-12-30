import Login from "@/Componets/Login";
import Signup from "@/Componets/Signup";
import { urlstate } from "@/Context/Context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const { loading, isAuthenicated } = urlstate();
  const navigate = useNavigate();

  const longlink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenicated && !loading) {
      navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ""}`);
    }
  }, [isAuthenicated, loading]);

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longlink ? "Hold up! Let's login first.." : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
