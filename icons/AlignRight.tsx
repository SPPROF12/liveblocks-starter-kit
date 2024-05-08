import { ComponentProps, SVGProps } from "react";

export function AlignRightIcon(
  props: ComponentProps<"svg"> & { cssProps?: SVGProps<SVGSVGElement> }
) {
  const { cssProps, ...svgProps } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      {...cssProps}
      aria-hidden
    >
      <path
        d="M12.5 2H7a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM7 4h5v1H7V4zm0 2h5v1H7V6zm0 2h5v1H7V8zm0 2h5v1H7v-1zm0 2h5v1H7v-1z"
        fillRule="evenodd"
      />
    </svg>
  );
}
