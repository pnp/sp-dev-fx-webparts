import * as React from "react";

export const StarRight = (
  props: React.SVGProps<SVGSVGElement>
): JSX.Element => (
  <svg
    width="10"
    height="20"
    viewBox="0 0 10 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    focusable="false"
    {...props}
  >
    <path d="M0.421197 0.833008C0.829455 0.833008 1.23772 1.0443 1.44901 1.47046L3.78754 6.212L9.01971 6.97122C9.95798 7.1073 10.334 8.26404 9.65358 8.92656L5.86823 12.6152L6.76354 17.8259C6.92469 18.7606 5.93986 19.4733 5.10185 19.0328L0.421197 16.576V0.833008Z" />
  </svg>
);
