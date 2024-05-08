import { Editor } from "@tiptap/react";
import { BoldIcon, ItalicIcon, StrikethroughIcon } from "@/icons";
import { Button } from "@/primitives/Button";
import styles from "./Toolbar.module.css";

type ToolbarButtonProps = {
  editor: Editor;
  icon: JSX.Element;
  toggleMethod: () => void;
  isActiveMethod: () => boolean;
  ariaLabel: string;
};

function ToolbarButton({
  editor,
  icon,
  toggleMethod,
  isActiveMethod,
  ariaLabel,
}: ToolbarButtonProps) {
  return (
    <Button
      variant="subtle"
      className={styles.toolbarButton}
      onClick={toggleMethod}
      disabled={!editor.can(toggleMethod)}
      data-active={isActiveMethod() ? "is-active" : undefined}
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
}

type Props = {
  editor: Editor;
};

export function ToolbarInline({ editor }: Props) {
  return (
    <>
      <ToolbarButton
        editor={editor}
        icon={<BoldIcon />}
        toggleMethod={() => editor.chain().focus().toggleBold().run()}
        isActiveMethod={() => editor.isActive("bold")}
        ariaLabel="Bold"
      />

      <ToolbarButton
        editor={editor}
        icon={<ItalicIcon />}
        toggleMethod={() => editor.chain().focus().toggleItalic().run()}
        isActiveMethod={() => editor.isActive("italic")}
        ariaLabel="Italic"
      />

      <ToolbarButton
        editor={editor}
        icon={<StrikethroughIcon />}
        toggleMethod={() => editor.chain().focus().toggleStrike().run()}
        isActiveMethod={() => editor.isActive("strike")}
        ariaLabel="Strikethrough"
      />
    </>
  );
}
