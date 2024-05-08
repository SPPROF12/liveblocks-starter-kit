import { ComponentProps, SVGProps } from "react";

export function CheckIcon(props: ComponentProps<"svg"> & { 'data-testid'?: string }) {
  return (
    <svg
      data-testid={props['data-testid']}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m13 4-6.333 8L3 8.667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <title>Checkmark icon</title>
    </svg>
  );
}
