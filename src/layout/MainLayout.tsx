import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* 🧭 Top Navigation */}
      <Header />

      {/* 🧩 Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ⚓ Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
