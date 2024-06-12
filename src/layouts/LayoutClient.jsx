import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function LayoutClient() {
  return (
    <div>
      <Header />
      <main className="max-w-screen-xl mx-auto mt-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
