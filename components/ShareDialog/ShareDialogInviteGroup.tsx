import clsx from "clsx";
import { useSession } from "next-auth/react";
import { ComponentProps, FormEvent, useState } from "react";
import { PlusIcon } from "@/icons";
import { updateGroupAccess } from "@/lib/actions";
import { Button, Select, Spinner } from "@/primitives";
import { capitalize } from "@/utils";
import styles from "./ShareDialogInvite.module.css";

type DocumentAccess = "READONLY" | "READWRITE";
type DocumentGroup = {
  id: string;
  title: string;
};

interface Props extends ComponentProps<"div"> {
  documentId: string;
  fullAccess: boolean;
  currentGroups: DocumentGroup[];
  onSetGroups: () => void;
}

export function ShareDialogInviteGroup({
  documentId,
  fullAccess,
  onSetGroups,
  className,
  currentGroups,
  ...props
}: Props) {
  const { data: session } = useSession();

  const [isInviteLoading, setInviteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const invitableGroupIds = (session?.user.info.groupIds ?? []).filter(
    (groupId) => currentGroups.every((group) => group.id !== groupId)
  );

  const handleAddDocumentGroup = async (id: string) => {
    setErrorMessage(undefined);
    setInviteLoading(true);

    const { error } = await updateGroupAccess({
      groupId: id,
      documentId: documentId,
      access: DocumentAccess.READONLY,
    });

    setInviteLoading(false);

    if (error) {
      setErrorMessage(error?.suggestion);
      return;
    }

    onSetGroups();
  };

  return (
    <div className={clsx(className, styles.section)} {...props}>
      {fullAccess ? (
        <>
          {session && invitableGroupIds.length ? (
            <form
              className={styles.inviteForm}
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const id = new FormData(e.currentTarget).get(
                  "groupId"
                ) as string;
                handleAddDocumentGroup(id);
              }}
            >
              <Select
                key={currentGroups[0]?.id || undefined}
                aboveOverlay
                name="groupId"
                className={styles.inviteSelect}
                items={invitableGroupIds.map((groupId) => ({
                  value: groupId,
                  title: capitalize(groupId),
                }))}
                placeholder="Choose a group…"
                required
                disabled={isInviteLoading}
              />
              <Button
                className={styles.inviteButton}
                icon={isInviteLoading ? <Spinner /> : <PlusIcon />}
                disabled={isInviteLoading}
              >
                Invite
              </Button>
            </form>
          ) : currentGroups.length > 0 ? (
            <div className={clsx(styles.error, styles.inviteFormMessage)}>
              All of your groups have already been added.
            </div>
          ) : null}
          {errorMessage && (
            <div className={clsx(styles.error, styles.inviteFormMessage)}>
              {errorMessage}
            </div>
          )}
        </>
      ) : (
        <div className={styles.error}>
          You need full access to invite groups.
        </div>
      )}
    </div>
  );
}
