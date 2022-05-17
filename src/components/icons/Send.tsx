import React from "react";
import IconURL from "assets/images/send.svg";

const Icon = () => (
  <img
    src={IconURL}
    style={{
      width: "24px",
      height: "24px",
    }}
    alt="icon"
  />
);

export default React.memo(Icon);
