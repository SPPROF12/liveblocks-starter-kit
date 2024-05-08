import React, { Suspense, useCallback, useEffect } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-comments";
import clsx from "clsx";
import PropTypes from "prop-types";
import { ComponentProps } from "react";
import {
  useInboxNotifications,
  useMarkAllInboxNotificationsAsRead,
} from "@/liveblocks.config";
import { Button, Link, Spinner } from "@/primitives";
import styles from "./Inbox.module.css";

function InboxContent({ inboxNotifications }: ComponentProps<typeof InboxContent>) {
  return (
    <div>
      {inboxNotifications.length === 0 ? (
        <div className={styles.emptyState}>
          <p>There aren’t any notifications yet.</p>
        </div>
      ) : (
        <InboxNotificationList>
          {inboxNotifications.map((inboxNotification) => (
            <InboxNotification
              key={inboxNotification.id}
              inboxNotification={inboxNotification}
              components={{ Anchor: Link }}
            />
          ))}
        </InboxNotificationList>
      )}
    </div>
  );
}

InboxContent.propTypes = {
  inboxNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export function Inbox({ className, ...props }: ComponentProps<"div">) {
  const markAllInboxNotificationsAsRead = useMarkAllInboxNotificationsAsRead();

  const handleMarkAllAsRead = useCallback(() => {
    markAllInboxNotificationsAsRead();
  }, [markAllInboxNotificationsAsRead]);

  useEffect(() => {
    handleMarkAllAsRead();
  }, [handleMarkAllAsRead]);

  return (
    <div className={clsx(className, styles.inbox)} {...props}>
      <div className={styles.inboxHeader}>
        <h2>Notifications</h2>
        <Button
          onClick={handleMarkAllAsRead}
          aria-label="Mark all notifications as read"
          data-testid="mark-all-as-read-button"
        >
          Mark all as read
        </Button>
      </div>
      <Suspense
        fallback={
          <div className={styles.emptyState}>
            <Spinner />
          </div>
        }
      >
        <InboxContent />
      </Suspense>
    </div>
  );
}
