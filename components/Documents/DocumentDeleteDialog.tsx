import { ComponentProps } from "react";
import { deleteDocument } from "@/lib/actions";
import { Button } from "@/primitives/Button";
import { Dialog } from "@/primitives/Dialog";
import styles from "./DocumentDeleteDialog.module.css";

interface Props
  extends Omit<ComponentProps<typeof Dialog>, "content" | "title"> {
  documentId: string;
  onDeleteDocument?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function DocumentDeleteDialog({
  documentId,
  onOpenChange = () => {},
  onDeleteDocument = () => {},
  children,
  ...props
}: Props) {
  async function handleDeleteDocument() {
    if (!documentId) {
      return;
    }

    try {
      const { error } = await deleteDocument({
        documentId,
      });

      if (error) {
        throw error;
      }

      onOpenChange(false);
      onDeleteDocument();
    } catch (error) {
      // Add error handling here
      console.error(error);
    }
  }

  return (
    <Dialog
      content={
        <div className={styles.dialog}>
          <p className={styles.description}>
            This will permanently delete the document.
          </p>
          <div className={styles.buttons}>
            <Button onClick={() => onOpenChange(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleDeleteDocument} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      }
      onOpenChange={onOpenChange}
      title="Delete document"
      {...props}
    >
      {children}
    </Dialog>
  );
}
