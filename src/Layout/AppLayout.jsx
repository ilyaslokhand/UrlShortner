import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/Componets/Header";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container mx-auto px-4">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with 💗 by Ilyas Lokhand
      </div>
    </div>
  );
};

export default AppLayout;
