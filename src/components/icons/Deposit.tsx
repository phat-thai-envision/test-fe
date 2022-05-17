import React from "react";
import IconURL from "assets/images/deposit.svg";

const Icon = () => (
  <img
    src={IconURL}
    style={{
      width: "26.67px",
      height: "18.67px",
    }}
    alt="icon"
  />
);

export default React.memo(Icon);
