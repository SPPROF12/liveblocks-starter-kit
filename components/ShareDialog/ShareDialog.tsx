import { useSession } from "next-auth/react";
import {
  DocumentAccess,
  useDocument,
  useUpdateShareDialog,
} from "@/lib/hooks";
import {
  Dialog,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/primitives/Dialog";
import { DocumentAccessProps } from "./DocumentAccess";
import { ShareDialogDefault } from "./ShareDialogDefault";
import { ShareDialogGroups } from "./ShareDialogGroups";
import { ShareDialogInviteGroup } from "./ShareDialogInviteGroup";
import { ShareDialogInviteUser } from "./ShareDialogInviteUser";
import { ShareDialogUsers } from "./ShareDialogUsers";
import styles from "./ShareDialog.module.css";

type DocumentProps = {
  documentId: string;
  documentAccesses: {
    default: DocumentAccess;
  };
};

type Props = Omit<ComponentProps<typeof Dialog>, "content" | "title"> &
  DocumentProps;

export function ShareDialog({ children, documentId, documentAccesses }: Props) {
  const { data: session } = useSession();
  const { data, mutate, error } = useDocument(documentId);
  const { broadcast } = useUpdateShareDialog();
  const [currentUserAccess, setCurrentUserAccess] = useState<DocumentAccess>(
    DocumentAccess.NONE
  );

  const fallbackData = {
    document: null,
    users: [],
    groups: [],
  };

  const { document: fallbackDocument, users: fallbackUsers, groups: fallbackGroups } =
    useMemo(() => fallbackData, []);

  const { data: users, mutate: revalidateUsers } = useDocumentsFunctionSWR(
    [getDocumentUsers, { documentId }],
    {
      refreshInterval: 0,
      fallbackData: fallbackUsers,
    }
  );

  const {
    data: groups,
    mutate: revalidateGroups,
  } = useDocumentsFunctionSWR([getDocumentGroups, { documentId }], {
    refreshInterval: 0,
    fallbackData: fallbackGroups,
  });

  const defaultAccess = data?.accesses?.default || documentAccesses.default;

  useEffect(() => {
    if (!data) {
      return;
    }

    const accessLevel = getDocumentAccess({
      documentAccesses: data.accesses,
      userId: session?.user?.info.id ?? "",
      groupIds: session?.user?.info.groupIds ?? [],
    });

    if (accessLevel === DocumentAccess.NONE) {
      window.location.reload();
      return;
    }

    const accessChanges = new Set([currentUserAccess, accessLevel]);
    if (
      accessChanges.has(DocumentAccess.READONLY) &&
      (accessChanges.has(DocumentAccess.EDIT) ||
        accessChanges.has(DocumentAccess.FULL))
    ) {
      window.location.reload();
      return;
    }

    setCurrentUserAccess(accessLevel);
  }, [data, session, currentUserAccess]);

  const revalidateAll = useCallback(() => {
    revalidateUsers();
    revalidateGroups();
    mutate();
  }, [mutate, revalidateGroups, revalidateUsers]);

  useEventListener(({ event }) => {
    if (event.type === "SHARE_DIALOG_UPDATE") {
      revalidateAll();
    }
  });

  return (
    <Dialog
      content={
        <div className={styles.dialog}>
          <Tabs.Root className={styles.dialogTabs} defaultValue="users">
            <Tabs.List className={styles.dialogTabList}>
              <Tabs.Trigger className={styles.dialogTab} value="users">
                <span className={styles.dialogTabLabel}>
                  <UserIcon className={styles.dialogTabIcon} />
                  <span>Users</span>
                </span>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.dialogTab} value="groups">
                <span className={styles.dialogTabLabel}>
                  <UsersIcon className={styles.dialogTabIcon} />
                  <span>Groups</span>
                </span>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="users" className={styles.dialogTabContent}>
              <ShareDialogInviteUser
                className={styles.dialogSection}
                documentId={documentId}
                fullAccess={currentUserAccess === DocumentAccess.FULL}
                onSetUsers={
                  () => {
                    revalidateAll();
                    broadcast({ type: "SHARE_DIALOG_UPDATE" });
                  }
                }
              />
              {users?.length ? (
                <ShareDialogUsers
                  className={styles.dialogSection}
                  documentId={documentId}
                  documentOwner={data?.owner || ""}
                  fullAccess={currentUserAccess === DocumentAccess.FULL}
                  onSetUsers={
                    () => {
                      revalidateAll();
                      broadcast({ type: "SHARE_DIALOG_UPDATE" });
                    }
                  }
                  users={users}
                />
              ) : null}
            </Tabs.Content>
            <Tabs.Content value="groups" className={styles.dialogTabContent}>
              <ShareDialogInviteGroup
                className={styles.dialogSection}
                documentId={documentId}
                fullAccess={currentUserAccess === DocumentAccess.FULL}
                currentGroups={groups || []}
                onSetGroups={
                  () => {
                    revalidateAll();
                    broadcast({ type: "SHARE_DIALOG_UPDATE" });
                  }
                }
              />
              {groups?.length ? (
                <ShareDialogGroups
                  className={styles.dialogSection}
                  documentId={documentId}
                  fullAccess={currentUserAccess === DocumentAccess.FULL}
                  groups={groups}
                  onSetGroups={
                    () => {
                      revalidateAll();
                      broadcast({ type: "SHARE_DIALOG_UPDATE" });
                    }
                  }
                />
              ) : null}
            </Tabs.Content>
          </Tabs.Root>
          <ShareDialogDefault
            className={styles.dialogSection}
            defaultAccess={defaultAccess}
            documentId={documentId}
            fullAccess={currentUserAccess === DocumentAccess.FULL}
            onSetDefaultAccess={
              () => {
                revalidateAll();
                broadcast({ type: "SHARE_DIALOG_UPDATE" });
              }
            }
          />
        </div>
      }
      title="Share document"
      {...props}
    >
      {children}
    </Dialog>
  );
}
