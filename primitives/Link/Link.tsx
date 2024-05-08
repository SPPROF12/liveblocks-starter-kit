import DefaultLink from "next/link";
import { ComponentPropsWithoutRef, ReactElement } from "react";

interface LinkProps extends Omit<ComponentProps<typeof DefaultLink>, "href"> {
  href: string;
}

export function Link({ href, ...props }: LinkProps): ReactElement {
  return <DefaultLink href={href} {...props} />;
}

interface AnchorProps extends Omit<ComponentProps<"a">, "href"> {
  href?: string;
}

export function Anchor({ href, ...props }: AnchorProps): ReactElement | null {
  if (!href) {
    return null;
  }
  return <a href={href} {...props} />;
}
