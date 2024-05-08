import clsx from "clsx";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ComponentProps, MouseEventHandler } from "react";
import { CrossIcon, MenuIcon, SignOutIcon } from "@/icons";
import { Avatar, Button, Popover } from "@/primitives/";
import { InboxPopover } from "../Inbox";
import { Logo } from "../Logo";
import styles from "./DashboardHeader.module.css";

interface DashboardHeaderProps extends ComponentProps<"header"> {
  isOpen: boolean;
  onMenuClick: MouseEventHandler<HTMLButtonElement>;
}

export default function DashboardHeader({
  isOpen,
  onMenuClick,
  className,
  ...props
}: DashboardHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className={clsx(className, styles.header)} {...props}>
      <div className={styles.menu}>
        <button className={styles.menuToggle} onClick={onMenuClick}>
          {isOpen ? <CrossIcon /> : <MenuIcon />}
        </button>
      </div>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <Logo />
        </Link>
      </div>
      <div className={styles.profile}>
        {session && (
          <Popover
            align="end"
            alignOffset={-6}
            content={
              <div className={styles.profilePopover}>
                <div className={styles.profilePopoverInfo}>
                  <span className={styles.profilePopoverName}>
                    {session.user.info.name}
                  </span>
                  <span className={styles.profilePopoverId}>
                    {session.user.info.id}
                  </span>
                </div>
                <div className={styles.profilePopoverActions}>
                  <Button
                    className={styles.profilePopoverButton}
                    icon={<SignOutIcon title="Sign out" />}
                    onClick={() => signOut()}
                    type="button"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            }
            side="bottom"
            sideOffset={6}
          >
            <button className={styles.profileButton}>
              <Avatar
                key={session.user.info.id}
                className={styles.profileAvatar}
                name={session.user.info.name}
                size={32}
                src={session.user.info.avatar}
              />
            </button>
          </Popover>
        )}
        <div className={styles.profileInbox}>
          <InboxPopover align="end" sideOffset={4} aria-label="Inbox" />
        </div>
      </div>
    </header>
  );
}
