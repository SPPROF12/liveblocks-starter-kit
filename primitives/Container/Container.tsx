import React from "react";
import clsx, { CSSModule } from "clsx";
import { ComponentProps } from "react";
import styles from "./Container.module.css";

type Size = "small" | "medium" | "large";

interface Props extends ComponentProps<"div"> {
  size?: Size;
}

export function Container({
  size = "medium",
  className,
  children,
  ...props
}: Props) {
  const containerClass = styles.container as CSSModule;
  const sizeClass = (() => {
    switch (size) {
      case "small":
        return styles.containerSmall;
      case "medium":
        return styles.containerMedium;
      case "large":
        return styles.containerLarge;
      default:
        return "";
    }
  })();

  return (
    <div
      className={clsx(containerClass, sizeClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

