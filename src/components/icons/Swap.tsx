import React from "react";
import IconURL from "assets/images/swap.svg";

const Icon = () => (
  <img
    src={IconURL}
    style={{
      width: "25.33px",
      height: "26.67px",
    }}
    alt="icon"
  />
);

export default React.memo(Icon);
