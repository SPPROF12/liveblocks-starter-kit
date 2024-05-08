"use client";

import { Editor } from "@tiptap/react";
import { nanoid } from "nanoid";
import { useCallback, useRef } from "react";
import { CommentIcon } from "@/icons";
import { Button } from "@/primitives/Button";
import styles from "./Toolbar.module.css";
import { CommentHighlight } from "@tiptap/extension-comment-highlight";

type Props = {
  editor: Editor & {
    isActive(name: keyof CommentHighlight.Attributes): boolean;
  };
};

export function ToolbarThread({ editor }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(async () => {
    editor
      .chain()
      .focus()
      .setCommentHighlight({
        highlightId: nanoid(),
        state: "composing",
      })
      .run();
  }, [editor]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter") {
        handleClick();
      }
    },
    [handleClick]
  );

  const handleBlur = useCallback(() => {
    if (editor.isActive("commentHighlight")) {
      editor.commands.setCommentHighlight(false);
    }
  }, [editor]);

  return (
    <div ref={wrapper}>
      <Button
        ref={buttonRef}
        variant="subtle"
        className={styles.toolbarButton}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        disabled={editor.isActive("commentHighlight")}
        data-active={
          editor.isActive("commentHighlight") ? "is-active" : undefined
        }
        data-testid="add-comment-button"
        aria-label="Add comment"
        aria-labelledby={buttonRef.current ? buttonRef.current.id : undefined}
      >
        <CommentIcon id={buttonRef.current ? buttonRef.current.id : undefined} />
      </Button>
    </div>
  );
}

