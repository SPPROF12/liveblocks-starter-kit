"use server";

import { auth } from "@/auth";
import { buildDocument, userAllowedInRoom } from "@/lib/utils";
import { liveblocks } from "@/liveblocks.server.config";
import { Document } from "@/types";

type Props = {
  documentId: Document["id"];
};

/**
 * Get a document.
 * Only allow if user has access to room (including logged-out users and public rooms).
 *
 * @param documentId - The document id
 * @returns {Promise<{data: Document} | {error: {code: number, message: string, suggestion: string}}>}
 */
export async function getDocument({ documentId }: Props): Promise<{ data: Document } | { error: { code: number, message: string, suggestion: string } }> {
  let session, room;
  try {
    // Get session and room
    const [sessionResult, roomResult] = await Promise.all([auth(), liveblocks.getRoom(documentId)]);
    session = sessionResult;
    room = roomResult;
  } catch (err) {
    console.error(err);
    return {
      error: {
        code: 500,
        message: "Error fetching document",
        suggestion: "Refresh the page and try again",
      },
    };
  }

  if (!room) {
    return {
      error: {
        code: 404,
        message: "Document not found",
        suggestion: "Check that you're on the correct page",
      },
    };
  }

  // Check current user has access to the room (if not logged in, use empty values)
  if (!userAllowedInRoom({
    accessAllowed: "read",
    userId: session?.user.info.id,
    groupIds: session?.user.info.groupIds,
    room,
  })) {
    if (!session) {
      return {
        error: {
          code: 401,
          message: "Unauthorized",
          suggestion: "Please log in to access the document",
        },
      };
    }
    return {
      error: {
        code: 403,
        message: "Not allowed access",
        suggestion: "Check that you've been given permission to the room",
      },
    };
  }

  // Convert room into our custom document format and return
  const document: Document = buildDocument(room);
  return { data: document };
}

