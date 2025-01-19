import React from "react";
import { Navigate } from "react-router-dom";
import { homeRoute } from "../../constants/routes";

type Props = {};

function DashboardRoot({}: Props) {
  return <Navigate to={homeRoute} />;
}

export default DashboardRoot;
