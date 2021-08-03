import * as React from "react";

function SvgReport(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path d="M6 22V6h16v7.543C22 17.65 16 16 16 16s1.518 6-2.638 6H6zm18-7.614V4H4v20h10.189C17.352 24 24 16.777 24 14.386zM14 16H9v-1h5v1zm5-4H9v1h10v-1zm0-3H9v1h10V9zm2-7H2v19H0V0h21v2z" />
    </svg>
  );
}

export default SvgReport;
