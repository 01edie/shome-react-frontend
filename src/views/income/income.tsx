import React from "react";
import ViewWrapper from "../../components/page/view-wrapper";
import ComingSoon from "../coming-soon";

type Props = {};

function Income({}: Props) {
  return <ComingSoon />;
}

export default ViewWrapper(Income, "Income");
