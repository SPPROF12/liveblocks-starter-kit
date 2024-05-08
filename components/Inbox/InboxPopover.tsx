import React, { useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { usePathname } from "next/navigation";
import { InboxIcon } from "@/icons";
import { useUnreadInboxNotificationsCount } from "@/liveblocks.config";
import { Button, type ButtonProps } from "@/primitives/Button";
import { Popover, type PopoverProps } from "@/primitives/Popover";
import { Inbox } from "./Inbox";
import styles from "./InboxPopover.module.css";

function InboxPopoverUnreadCount() {
  const { count } = useUnreadInboxNotificationsCount();

  const countMemo = useMemo(() => {
    if (count === undefined || count === null) return null;
    if (typeof count !== "number") throw new Error("count must be a number");
    return count;
  }, [count]);

  return countMemo ? (
    <div className={styles.inboxPopoverUnreadCount}>{countMemo}</div>
  ) : null;
}

export function InboxPopover(
  props: Omit<ComponentProps<typeof Popover>, "content"> & {
    content: ReactNode;
  }
) {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const buttonProps: ButtonProps = {
    variant: "secondary",
    icon: <InboxIcon />,
    iconButton: true,
    tabIndex: 0,
  };

  const popoverProps: PopoverProps = {
    open: isOpen,
    onOpenChange: setOpen,
    content: <Inbox className={styles.inboxPopover} />,
    ref: props.ref,
  };

  return (
    <Popover {...popoverProps}>
      <ClientSideSuspense fallback={null}>
        {() => <InboxPopoverUnreadCount />}
      </ClientSideSuspense>
      <Button {...buttonProps} />
    </Popover>
  );
}
