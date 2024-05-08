import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Badge.module.css";

const LIVEBLOCKS_LINK = "https://liveblocks.io";

export function Badge({
  className,
  title,
  testId,
  ...props
}: {
  className?: string;
  title?: string;
  testId?: string;
} & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      className={clsx(className, styles.badge)}
      href={LIVEBLOCKS_LINK}
      rel="noopener noreferrer"
      title={title}
      target="_blank"
      data-testid={testId}
      {...props}
    >
      <picture>
        <source
          srcSet="https://liveblocks.io/badge-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="https://liveblocks.io/badge-light.svg"
          alt="Made with Liveblocks"
          className={styles.image}
        />
      </picture>
    </a>
  );
}
