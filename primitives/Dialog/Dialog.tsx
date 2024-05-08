import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { CrossIcon } from "../../icons";
import { Button } from "../Button";
import styles from "./Dialog.module.css";

interface Props extends RadixDialog.DialogProps {
  title: string;
  content: ReactNode;
  onClose?: () => void;
}

export function Dialog({
  title,
  content,
  children,
  modal = true,
  onClose,
  ...props
}: Props) {
  return (
    <RadixDialog.Root modal={modal} onClose={onClose} {...props}>
      <RadixDialog.Trigger
        asChild
        aria-label="Open dialog"
      >
        {children}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content className={styles.dialog}>
          <div className={styles.header}>
            <RadixDialog.Title className={styles.title}>
              {title}
            </RadixDialog.Title>
            <RadixDialog.Close asChild>
              <Button
                icon={<CrossIcon />}
                className={styles.closeButton}
                variant="subtle"
              />
            </RadixDialog.Close>
          </div>
          <div className={styles.content}>{content}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

// In your CSS file
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  transition: opacity 150ms ease;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 400px;
  padding: 24px;
  transition: transform 150ms ease;
}

.overlay[data-state="open"] {
  opacity: 1;
}

.dialog[data-state="open"] {
  transform: translate(-50%, -50%) scale(1);
}
