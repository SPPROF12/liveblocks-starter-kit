import { ComponentProps, SVGProps } from "react";

const cssProps = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
};

export function LinkIcon(
  props: ComponentProps<"svg"> & { className?: string }
) {
  return (
    <svg {...cssProps} {...props}>
      <path
        d="M7 9a3 3 0 0 0 .943.86A2.8 2.8 0 0 0 9 11a2.8 2.8 0 0 0 2.061-.86l1.758-2.05c.534-.584.83-1.365.823-2.175a3.2 3.2 0 0 0-1.858-2.66A3 3 0 0 0 7 4a3 3 0 0 0-1.858.34Z"
        stroke="currentColor"
        fill="none"
      />
      <path
        d="M9 7a2.938 2.938 0 0 0-.943-.86A2.763 2.763 0 0 0 5.628 6a2.938 2.938 0 0 0-1.047.71L2.823 8.76a3.184 3.184 0 0 0-.17.94A2.856 2.856 0 0 0 4.905 14a2.856 2.856 0 0 0 2.061-.868l.501-.528Z"
        stroke="currentColor"
        fill="none"
      />
    </svg>
  );
}
