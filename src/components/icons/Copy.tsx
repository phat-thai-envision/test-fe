import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 8.667V8c0-1.103.897-2 2-2h.667V3.778c0-.245-.2-.445-.445-.445H3.778c-.245 0-.445.2-.445.445v4.444c0 .245.2.445.445.445H6ZM6 10H3.778A1.78 1.78 0 0 1 2 8.222V3.778C2 2.798 2.797 2 3.778 2h4.444C9.202 2 10 2.797 10 3.778V6h2c1.103 0 2 .897 2 2v4c0 1.103-.897 2-2 2H8c-1.103 0-2-.897-2-2v-2Zm1.333-2c0-.367.3-.667.667-.667h4c.368 0 .667.3.667.667v4a.667.667 0 0 1-.667.667H8A.668.668 0 0 1 7.333 12V8Z"
      fill="#fff"
    />
    <mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={2}
      y={2}
      width={12}
      height={12}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8.667V8c0-1.103.897-2 2-2h.667V3.778c0-.245-.2-.445-.445-.445H3.778c-.245 0-.445.2-.445.445v4.444c0 .245.2.445.445.445H6ZM6 10H3.778A1.78 1.78 0 0 1 2 8.222V3.778C2 2.798 2.797 2 3.778 2h4.444C9.202 2 10 2.797 10 3.778V6h2c1.103 0 2 .897 2 2v4c0 1.103-.897 2-2 2H8c-1.103 0-2-.897-2-2v-2Zm1.333-2c0-.367.3-.667.667-.667h4c.368 0 .667.3.667.667v4a.667.667 0 0 1-.667.667H8A.668.668 0 0 1 7.333 12V8Z"
        fill="#fff"
      />
    </mask>
  </svg>
);

export default SvgComponent;
