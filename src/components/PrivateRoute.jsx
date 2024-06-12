import React from "react";
import { Navigate, Outlet } from "react-router";
import Header from "./Header";

const PrivateRoute = () => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto mt-5">
      {accessToken ? <Outlet /> : <Navigate to="/login" />}
      </main>
    </>
  );
};

export default PrivateRoute;
