import clsx from "clsx";
import { forwardRef, ComponentProps } from "react";
import { cssVars, useCSSVars } from "@mantine/core";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends ComponentProps<"svg"> {
  size?: number;
  cssVars?: cssVars;
}

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>((props, ref) => {
  const { cssVars: customCssVars, ...spinnerProps } = useCSSVars(props.cssVars);

  return (
    <svg
      ref={ref}
      width={props.size}
      height={props.size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label="Loading"
      className={clsx(props.className, styles.spinner, customCssVars?.root)}
      {...spinnerProps}
    >
      <path
        d="M14 8a6 6 0 1 1-6-6"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        className={customCssVars?.path}
      />
    </svg>
  );
});

export interface DocumentSpinnerProps {
  size?: number;
  cssVars?: cssVars;
}

const DocumentSpinner = forwardRef<HTMLDivElement, DocumentSpinnerProps>(
  ({ size = 24, cssVars, ...props }, ref) => {
    return (
      <div ref={ref} className={styles.documentSpinner} {...props}>
        <Spinner size={size} cssVars={cssVars} />
      </div>
    );
  }
);

export { Spinner, DocumentSpinner };
