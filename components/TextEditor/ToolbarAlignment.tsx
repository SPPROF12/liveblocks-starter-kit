import { Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "@/icons";
import { Button, ButtonProps } from "@/primitives/Button";
import styles from "./Toolbar.module.css";

type TextAlign = "left" | "center" | "right" | "justify";

type Props = {
  editor: Editor;
};

const alignButtonProps = (
  editor: Editor,
  tooltip: string,
  align: TextAlign
): ButtonProps => ({
  variant: "subtle",
  className: styles.toolbarButton,
  onClick: () => editor.chain().focus().setTextAlign(align).run(),
  disabled: !editor.can().chain().focus().setTextAlign(align).run(),
  "data-active": editor.isActive({ textAlign: align }) ? "is-active" : undefined,
  key: align,
  ref: editor.view.dom.createElement("button"),
  aria-label: tooltip,
});

export function ToolbarAlignment({ editor }: Props) {
  return (
    <>
      <Button {...alignButtonProps(editor, "Align left", "left")}>
        <AlignLeftIcon />
      </Button>

      <Button {...alignButtonProps(editor, "Align center", "center")}>
        <AlignCenterIcon />
      </Button>

      <Button {...alignButtonProps(editor, "Align right", "right")}>
        <AlignRightIcon />
      </Button>

      <Button {...alignButtonProps(editor, "Justify", "justify")}>
        <AlignJustifyIcon />
      </Button>
    </>
  );
}
