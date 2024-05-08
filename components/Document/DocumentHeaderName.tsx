import clsx from "clsx";
import {
  ChangeEvent,
  ComponentProps,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { EditIcon } from "@/icons";
import { useInitialDocument } from "@/lib/hooks/useInitialDocument";
import { useSelf } from "@/liveblocks.config";
import { Tooltip, TooltipProps } from "@/primitives/Tooltip";
import styles from "./DocumentHeaderName.module.css";

type DocumentRenameEventHandler = () => void;
type DocumentRenameCancelEventHandler = () => void;
type DocumentRenameSaveEventHandler = () => void;
type DocumentNameChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type DocumentNameKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => void;

interface DocumentHeaderNameProps extends ComponentProps<"div"> {
  onDocumentRename: (name: string) => void;
}

interface DocumentHeaderNameState {
  draftName: string;
  isRenaming: boolean;
}

export function DocumentHeaderName({
  onDocumentRename,
  className,
  ...props
}: DocumentHeaderNameProps) {
  const initialDocument = useInitialDocument();
  const isReadOnly = useSelf((me) => !me.canWrite);
  const [state, setState] = useState<DocumentHeaderNameState>({
    draftName: initialDocument.name,
    isRenaming: false,
  });

  const handleRenamingStart: DocumentRenameEventHandler = useCallback(() => {
    setState((prevState) => ({ ...prevState, isRenaming: true }));
  }, []);

  const handleRenamingCancel: DocumentRenameCancelEventHandler = useCallback(() => {
    setState((prevState) => ({ ...prevState, draftName: initialDocument.name, isRenaming: false }));
  }, [initialDocument]);

  const handleRenamingSave: DocumentRenameSaveEventHandler = useCallback(() => {
    onDocumentRename(state.draftName);
    setState((prevState) => ({ ...prevState, isRenaming: false }));
  }, [state.draftName, onDocumentRename]);

  const handleNameChange: DocumentNameChangeEventHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, draftName: event.target.value }));
    },
    []
  );

  const handleNameKeyDown: DocumentNameKeyDownEventHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleRenamingSave();
      } else if (event.key === "Escape") {
        handleRenamingCancel();
      }
    },
    [handleRenamingCancel, handleRenamingSave]
  );

  const { draftName, isRenaming } = state;

  return (
    <div className={clsx(className, styles.container)} {...props}>
      {isReadOnly ? (
        <>
          <span className={styles.name}>{draftName}</span>
          <span className={styles.badge}>Read-only</span>
        </>
      ) : isRenaming ? (
        <input
          autoFocus
          className={styles.nameInput}
          onBlur={handleRenamingCancel}
          onChange={handleNameChange}
          onKeyDown={handleNameKeyDown}
          value={draftName}
        />
      ) : (
        <>
          <span className={styles.name}>{draftName}</span>
          <Tooltip content="Rename" sideOffset={30}>
            <button
              className={styles.renameButton}
              onClick={handleRenamingStart}
            >
              <EditIcon />
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
}

interface TooltipPropsWithChildren extends TooltipProps {
  children: JSX.Element;
}

export function TooltipWithChildren({ children, ...props }: TooltipPropsWithChildren) {
  return <Tooltip {...props}>{children}</Tooltip>;
}

interface ButtonPropsWithChildren extends ComponentProps<"button"> {
  children: JSX.Element;
}

export function ButtonWithChildren({ children, ...props }: ButtonPropsWithChildren) {
  return <button {...props}>{children}</button>;
}

interface InputPropsWithChildren extends ComponentProps<"input"> {
  children: JSX.Element;
}

export function InputWithChildren({ children, ...props }: InputPropsWithChildren) {
  return <input {...props}>{children}</input>;
}

interface SpanPropsWithChildren extends ComponentProps<"span"> {
  children: JSX.Element;
}

export function SpanWithChildren({ children, ...props }: SpanPropsWithChildren) {
  return <span {...props}>{children}</span>;
}

interface DivPropsWithChildren extends ComponentProps<"div"> {
  children: JSX.Element;
}

export function DivWithChildren({ children, ...props }: DivPropsWithChildren) {
  return <div {...props}>{children}</div>;
}
