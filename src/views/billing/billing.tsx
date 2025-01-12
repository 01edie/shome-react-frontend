import React from "react";
import ViewWrapper from "../../components/page/view-wrapper";
import ComingSoon from "../coming-soon";

type Props = {};

function Billing({}: Props) {
  return <ComingSoon />;
}

export default ViewWrapper(Billing, "Billing");
