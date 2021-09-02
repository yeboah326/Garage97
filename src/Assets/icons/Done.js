import * as React from "react";

function SvgDone(props) {
  return (
    <svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
      onClick={props.onClick}
    >
      <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11S1 18.071 1 12 5.929 1 12 1zm7 7.457l-9.005 9.565L5 12.157l.761-.649 4.271 5.016 8.24-8.752.728.685z" />
    </svg>
  );
}

export default SvgDone;
