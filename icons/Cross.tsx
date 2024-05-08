import { ComponentProps, SVGProps } from "react";

export function CrossIcon(
  props: ComponentProps<"svg"> & {
    width?: number;
    height?: number;
    viewBox?: string;
    vectorEffect?: SVGProps<SVGSVGElement>["vectorEffect"];
    className?: string;
    "data-testid"?: string;
  }
) {
  const {
    width = 16,
    height = 16,
    viewBox = "0 0 16 16",
    vectorEffect = "non-scaling-stroke",
    className,
    "data-testid": dataTestId,
    ...svgProps
  } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid={dataTestId}
      vectorEffect={vectorEffect}
      {...svgProps}
    >
      <path
        d="m4 4 8 8M4 12l8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
