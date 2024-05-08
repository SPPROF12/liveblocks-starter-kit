import { SVGProps } from "react";

export type DeleteIconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  color?: string;
  size?: number;
};

export function DeleteIcon(props: DeleteIconProps) {
  const { className, color = "currentColor", size = 16, ...svgProps } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M4 5h8l-.672 7.14a1.5 1.5 0 0 1-1.493 1.36h-3.67a1.5 1.5 0 0 1-1.493-1.36L4 5ZM5.5 3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5h-5V3.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M2.5 5h11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
