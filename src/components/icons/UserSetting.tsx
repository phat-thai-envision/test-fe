import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={32} height={32} rx={8} fill="#F7F9FC" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 11c0 2.206-1.794 4-4 4s-4-1.794-4-4 1.794-4 4-4 4 1.794 4 4Zm3 13a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1c0-3.86 3.141-7 7-7s7 3.14 7 7Z"
      fill="#1273EA"
    />
    <mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={9}
      y={7}
      width={14}
      height={18}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 11c0 2.206-1.794 4-4 4s-4-1.794-4-4 1.794-4 4-4 4 1.794 4 4Zm3 13a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1c0-3.86 3.141-7 7-7s7 3.14 7 7Z"
        fill="#fff"
      />
    </mask>
  </svg>
);

export default SvgComponent;
