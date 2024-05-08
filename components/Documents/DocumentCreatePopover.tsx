import { ComponentProps, useState } from "react";
import { PlusIcon } from "@/icons";
import { createDocument } from "@/lib/actions";
import { Button, Popover } from "@/primitives/Button";
import { Document, DocumentGroup, DocumentType, DocumentUser } from "@/types";
import styles from "./DocumentCreatePopover.module.css";

interface Props
  extends Omit<ComponentProps<typeof Popover>, "content">,
    Pick<Document, "draft" | "name">,
    Pick<DocumentUser, "id">,
    Pick<DocumentGroup, "id">[] {
  createDocument: (
    document: Omit<Document, "id" | "createdAt" | "updatedAt"> & {
      groupIds?: DocumentGroup["id"][] | undefined;
    },
    navigate: boolean
  ) => Promise<{ data?: Document; error?: Error } | null>;
}

export function DocumentCreatePopover({
  groupIds,
  userId,
  draft,
  name: documentName,
  createDocument,
  children,
  ...props
}: Props) {
  const [disableButtons, setDisableButtons] = useState(false);
  const [loading, setLoading] = useState(false);

  const createNewDocument = async (name: string, type: DocumentType) => {
    if (!createDocument) return;

    setDisableButtons(true);
    setLoading(true);

    try {
      const result = await createDocument(
        {
          name,
          type,
          userId,
          draft,
          groupIds: draft ? undefined : groupIds,
        },
        true
      );

      if (!result || result?.error || !result.data) {
        setDisableButtons(false);
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (error) {
      setDisableButtons(false);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Popover
      content={
        <div className={styles.popover}>
          <Button
            icon={<PlusIcon />}
            onClick={() => {
              createNewDocument("Untitled", "text");
            }}
            variant="subtle"
            disabled={disableButtons || loading}
            key="text"
          >
            Text
          </Button>
          <Button
            icon={<PlusIcon />}
            onClick={() => {
              createNewDocument("Untitled", "whiteboard");
            }}
            variant="subtle"
            disabled={disableButtons || loading}
            key="whiteboard"
          >
            Whiteboard
          </Button>
          {createDocument && (
            <Button
              icon={<PlusIcon />}
              onClick={() => {
                createNewDocument("Untitled", "spreadsheet");
              }}
              variant="subtle"
              disabled={disableButtons || loading}
              key="spreadsheet"
            >
              Spreadsheet
            </Button>
          )}
        </div>
      }
      modal
      side="bottom"
      {...props}
    >
      {children}
    </Popover>
  );
}

