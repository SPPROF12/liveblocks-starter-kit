import clsx from "clsx";
import { ComponentProps, useMemo } from "react";
import { GitHubIcon } from "@/icons";
import { LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import { MarketingFooterProps } from "./MarketingFooter.types";

export function MarketingFooter({
  className,
  marginBottom,
  ...props
}: MarketingFooterProps) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className={clsx(className, styles.footer)}
      data-testid="marketing-footer"
      {...props}
    >
      <Container marginBottom={marginBottom} className={styles.container}>
        <span className={styles.copyright}>© {year} Liveblocks Inc.</span>
        <LinkButton
          href="https://github.com/liveblocks/liveblocks/tree/main/starter-kits/nextjs-starter-kit"
          icon={<GitHubIcon aria-label="GitHub" />}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          View on GitHub
        </LinkButton>
      </Container>
    </footer>
  );
}


import { ComponentProps } from "react";

export interface MarketingFooterProps extends ComponentProps<"footer"> {
  marginBottom?: string;
}
