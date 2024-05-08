import { Editor } from "@tiptap/react";
import { RedoIcon, UndoIcon } from "@/icons";
import { Button } from "@/primitives/Button";
import styles from "./Toolbar.module.css";

type ButtonProps = {
  className?: string;
  variant?: string;
  onClick: () => void;
  disabled?: boolean;
  dataActive?: string;
  ariaLabel: string;
  eventKey?: string;
};

export function ToolbarCommands({ editor }: Props) {
  const undoCanRun = editor.can().chain().undo().run();
  const redoCanRun = editor.can().chain().redo().run();

  return (
    <>
      <Button
        className={styles.toolbarButton}
        variant="subtle"
        onClick={() => {
          try {
            undoCanRun && editor.chain().undo().run();
          } catch (error) {
            console.error(error);
          }
        }}
        disabled={!undoCanRun}
        data-active={editor.isActive("bulletList") ? "is-active" : undefined}
        data-testid="undo-button"
        aria-label="Undo"
        eventKey="u"
      >
        <UndoIcon />
      </Button>

      <Button
        className={styles.toolbarButton}
        variant="subtle"
        onClick={() => {
          try {
            redoCanRun && editor.chain().redo().run();
          } catch (error) {
            console.error(error);
          }
        }}
        disabled={!redoCanRun}
        data-active={editor.isActive("orderedList") ? "is-active" : undefined}
        data-testid="redo-button"
        aria-label="Redo"
        eventKey="r"
      >
        <RedoIcon />
      </Button>
    </>
  );
}

interface Props {
  editor: Editor;
}
