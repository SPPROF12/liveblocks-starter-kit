import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, FormEventHandler } from "react";
import { signIn } from "@/auth";
import { SignInIcon } from "@/icons";
import { Button, ButtonType } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import { Logo } from "../Logo";
import styles from "./MarketingHeader.module.css";

export type MarketingHeaderProps = ComponentProps<"header">;

export function MarketingHeader(props: MarketingHeaderProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await signIn();
  };

  return (
    <header className={clsx(props.className, styles.header)} {...props}>
      <Container className={styles.container}>
        <Link href="/" data-testid="logo-link">
          <Logo />
        </Link>
        <form onSubmit={handleSubmit} data-testid="sign-in-form">
          <Button
            type={ButtonType.Submit}
            icon={<SignInIcon title="Sign In Icon" />}
            aria-label="Sign in"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </form>
      </Container>
    </header>
  );
}



import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, FormEventHandler } from "react";
import { signIn } from "@/auth";
import { SignInIcon } from "@/icons";
import { Button, ButtonType } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import { Logo } from "../Logo";
import styles from "./MarketingHeader.module.css";

export type MarketingHeaderProps = ComponentProps<"header">;

export function MarketingHeader(props: MarketingHeaderProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await signIn();
  };

  return (
    <header className={clsx(props.className, styles.header)} {...props}>
      <Container className={styles.container}>
        <Link href="/" data-testid="logo-link">
          <Logo />
        </Link>
        <form onSubmit={handleSubmit} data-testid="sign-in-form">
          <Button
            type={ButtonType.Submit}
            icon={<SignInIcon title="Sign In Icon" />}
            aria-label="Sign in"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </form>
      </Container>
    </header>
  );
}

