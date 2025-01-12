import React from "react";
import { Navigate } from "react-router-dom";

type Props = {};

function DashboardRoot({}: Props) {
  return <Navigate to="/app/dashboard" />;
}

export default DashboardRoot;
