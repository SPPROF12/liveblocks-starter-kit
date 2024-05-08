import { LiveObject, shallow } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  PointerEvent,
  useRef,
  useState,
} from "react";
import { PlusIcon, RedoIcon, UndoIcon } from "@/icons";
import {
  UserMeta,
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { Button } from "@/primitives/Button";
import { DocumentSpinner } from "@/primitives/Spinner";
import { Tooltip } from "@/primitives/Tooltip";
import { useBoundingClientRectRef } from "@/utils";
import { Cursors } from "../Cursors";
import { WhiteboardNote } from "./WhiteboardNote";
import styles from "./Whiteboard.module.css";

type Props = ComponentProps<"div"> & {
  currentUser: UserMeta["info"] | null;
};

/**
 * This file shows how to create a multiplayer canvas with draggable notes.
 * The notes allow you to add text, display who's currently editing them, and can be removed.
 * There's also a toolbar allowing you to undo/redo your actions and add more notes.
 */

export function Whiteboard() {
  const { data: session } = useSession();

  return (
    <ClientSideSuspense fallback={<DocumentSpinner />}>
      {() => <Canvas currentUser={session?.user.info ?? null} />}
    </ClientSideSuspense>
  );
}

// The main Liveblocks code, handling all events and note modifications
function Canvas({ currentUser, className, style, ...props }: Props) {
  // An array of every note id
  const noteIds = useStorage((root) => Array.from(root.notes.keys()), shallow);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const canvasRef = useRef<HTMLDivElement>(null);
  const rectRef = useBoundingClientRectRef(canvasRef);

  const isReadOnly = useSelf((me) => me.isReadOnly);

  // Info about element being dragged
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef<{
    element: Element;
    noteId: string;
    offset: { x: number; y: number };
  } | null>(null);

  // Insert a new note onto the canvas
  const insertNote = useMutation(
    (args) => {
      if (args.self.isReadOnly) {
        return;
      }

      const noteId = nanoid();
      const note = new LiveObject({
        x: getRandomInt(300),
        y: getRandomInt(300),
        text: "",
        selectedBy: null,
        id: noteId,
      });
      args.storage.get("notes").set(noteId, note);
    },
    {
      storage: true,
      self: true,
    }
  );

  // Delete a note
  const handleNoteDelete = useMutation(
    (args) => {
      if (args.self.isReadOnly) {
        return;
      }

      args.storage.get("notes").delete(args.noteId);
    },
    {
      storage: true,
      self: true,
      noteId: true,
    }
  );

  // Update a note, if it exists
  const handleNoteUpdate = useMutation(
    (args) => {
      if (args.self.isReadOnly) {
        return;
      }

      const note = args.storage.get("notes").get(args.noteId);
      if (note) {
        note.update(args.updates);
      }
    },
    {
      storage: true,
      self: true,
      noteId: true,
      updates: true,
    }
  );

  // On note pointer down, pause history, set dragged note
  function handleNotePointerDown(
    e: PointerEvent<HTMLDivElement>,
    noteId: string
  ) {
    history.pause();
    e.stopPropagation();
    const element = document.querySelector(`[data-note="${noteId}"]`);
    if (!element) {
      return;
    }

    // Get position of cursor on note, to use as an offset when moving notes
    const rect = element.getBoundingClientRect();
    const offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    dragInfo.current = { noteId, element, offset };
    setIsDragging(true);
    document.documentElement.classList.add("grabbing");
  }

  // On canvas pointer up, remove dragged element, resume history
  function handleCanvasPointerUp() {
    setIsDragging(false);
    dragInfo.current = null;
    document.documentElement.classList.remove("grabbing");
    history.resume();
  }

  // If dragging on canvas pointer move, move element and adjust for offset
  function handleCanvasPointerMove(e: PointerEvent<HTMLDivElement>) {
    e.preventDefault();

    if (isDragging && dragInfo.current) {
      const { x, y } = dragInfo.current.offset;
      const coords = {
        x: e.clientX - rectRef.current.x - x,
        y: e.clientY - rectRef.current.y - y,
      };
      handleNoteUpdate(dragInfo.current.noteId, coords);
    }
  }

  // When note text is changed, update the text and selected user on the LiveObject
  function handleNoteChange(
    e: ChangeEvent<HTMLTextAreaElement>,
    noteId: string
  ) {
    handleNoteUpdate(noteId, { text: e.target.value, selectedBy: currentUser });
  }

  // When note is focused, update the selected user on the LiveObject
  function handleNoteFocus(e: FocusEvent<HTMLTextAreaElement>, noteId: string) {
    history.pause();
    handleNoteUpdate(noteId, { selectedBy: currentUser });
  }

  // When note is unfocused, remove the selected user on the LiveObject
  function handleNoteBlur(e: FocusEvent<HTMLTextAreaElement>, noteId: string) {
    handleNoteUpdate(noteId, { selectedBy: null });
    history.resume();
  }

  return (
    <div
      className={clsx(className, styles.canvas)}
      onPointerMove={handleCanvasPointerMove}
      onPointerUp={handleCanvasPointerUp}
      ref={canvasRef}
      style={{ pointerEvents: isReadOnly ? "none" : undefined, ...style }}
      {...props}
    >
      <Cursors element={canvasRef} />
      {noteIds.map((id) => (
        <WhiteboardNote
          dragged={id === dragInfo?.current?.noteId}
          id={id}
          key={id}
          onBlur={(e) => handleNoteBlur(e, id)}
          onChange={(e) => handleNoteChange(e, id)}
          onDelete={() => handleNoteDelete(id)}
          onFocus={(e) => handleNoteFocus(e, id)}
          onPointerDown={(e) => handleNotePointerDown(e, id)}
        />
      ))}

      {!isReadOnly && (
        <div className={styles.toolbar}>
          <Tooltip content="Add note" sideOffset={16}>
            <Button icon={<PlusIcon />} onClick={insertNote} variant="subtle" />
          </Tooltip>
          <Tooltip content="Undo" sideOffset={16}>
            <Button
              disabled={!canUndo}
              icon={<UndoIcon />}
              onClick={history.undo}
              variant="subtle"
            />
          </Tooltip>
          <Tooltip content="Redo" sideOffset={16}>
            <Button
              disabled={!canRedo}
              icon={<RedoIcon />}
              onClick={history.redo}
              variant="subtle"
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
