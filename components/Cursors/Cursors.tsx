import { MutableRefObject, useEffect } from "react";
import { useOthers, useUpdateMyPresence } from "@/liveblocks.config";
import { Cursor } from "./Cursor";

interface Props {
  // The element that's used for pointer events and scroll position
  elementRef: MutableRefObject<HTMLElement | null>;
}

/**
 * This file shows you how to create a reusable live cursors component for your product.
 * The component takes a reference to another element ref `elementRef` and renders
 * cursors according to the location and scroll position of this panel.
 */
export function LiveCursors({ elementRef }: Props) {
  // UseUpdateMyPresence returns a function to update the current user's presence.
  // updateMyPresence is different to the setState function returned by the useState hook from React.
  // You don't need to pass the full presence object to update it.
  // See https://liveblocks.io/docs/api-reference/liveblocks-react#useUpdateMyPresence for more information
  const updateMyPresence = useUpdateMyPresence();

  // Return all the other users in the room and their presence (a cursor position in this case)
  const others = useOthers();

  // Add event listeners to update the user's presence on pointermove and pointerleave
  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!elementRef.current) {
        return;
      }

      const { top, left } = elementRef.current.getBoundingClientRect();

      const x = event.clientX - left + elementRef.current.scrollLeft;
      const y = event.clientY - top + elementRef.current.scrollTop;

      updateMyPresence({
        cursor: {
          x: Math.round(x),
          y: Math.round(y),
        },
      });
    };

    const handlePointerLeave = () => {
      updateMyPresence({
        cursor: null,
      });
    };

    elementRef.current.addEventListener("pointermove", handlePointerMove);
    elementRef.current.addEventListener("pointerleave", handlePointerLeave);

    // Clean up event listeners
    return () => {
      if (!elementRef.current) {
        return;
      }
      elementRef.current.removeEventListener("pointermove", handlePointerMove);
      elementRef.current.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [updateMyPresence, elementRef]);

  // Render the cursors for other users based on their presence
  return (
    <>
      {
        others.map(({ connectionId, presence, info }) => {
          if (presence == null || presence.cursor == null) {
            return null;
          }

          return (
            <Cursor
              color={info?.color}
              key={`cursor-${connectionId}`}
              // connectionId is an integer that is incremented at every new connections
              // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
              name={info?.name}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          );
        })
      }
    </>
  );
}
