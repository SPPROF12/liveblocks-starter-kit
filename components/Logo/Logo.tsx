import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export type LogoProps = ComponentProps<"div"> & {
  title?: string;
};

export function Logo({
  className,
  title,
  ...props
}: LogoProps): JSX.Element {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <svg
        className={styles.mark}
        fill="none"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="logo-title logo-desc"
      >
        <title id="logo-title">{title || "Starter Kit Logo"}</title>
        <desc id="logo-desc">A stylized letter 'S' representing Starter Kit</desc>
        <path
          clipRule="evenodd"
          d="M21.657 8H2l5.657 5.6v7.733L21.657 8ZM10.343 24H30l-5.657-5.6v-7.733L10.343 24Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <span className={styles.wordmark}>Starter Kit</span>
    </div>
  );
}
