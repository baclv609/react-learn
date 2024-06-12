import React from "react";
import { Outlet } from "react-router";

export default function LayoutAdmin() {
  return (
    <div>
      <h2>LayoutAdmin</h2>
      <Outlet />
    </div>
  );
}
