"use server";

import { auth } from "@/auth";
import { GetDocumentsResponse } from "@/lib/actions/getDocuments";
import { buildDocuments, userAllowedInRoom } from "@/lib/utils";
import { liveblocks } from "@/liveblocks.server.config";

type Props = {
  nextCursor: string;
};

type Room = {
  id: string;
  metadata: {
    title: string;
  };
};

type GetRoomsResponse = {
  data: Room[];
  nextCursor: string | null;
};

/**
 * Get Next Documents
 *
 * Get the next set of documents using userId and nextPage.
 * nextPage can be retrieved from getDocumentsByGroup.ts
 * Uses custom API endpoint
 *
 * @param nextPage - nextPage, retrieved from getDocumentByGroup
 */
export async function getNextDocuments({ nextCursor }: Props): Promise<{ data: GetDocumentsResponse | null }> {
  let session: Awaited<ReturnType<typeof auth>> | null = null;
  let getRoomsResponse: Awaited<ReturnType<typeof liveblocks.getRooms>>;
  try {
    // Get session and rooms
    const result = await Promise.all([auth(), liveblocks.getRooms({ startingAfter: nextCursor })]);
    [session, getRoomsResponse] = result;
  } catch (err) {
    console.log(err);
    return {
      error: {
        code: 500,
        message: "Error fetching rooms",
        suggestion: "Refresh the page and try again",
      },
    };
  }

  // Check user is logged in
  if (!session) {
    return {
      error: {
        code: 401,
        message: "Not signed in",
        suggestion: "Sign in to get documents",
      },
    };
  }

  const { data: rooms, nextCursor: newNextCursor } = getRoomsResponse as GetRoomsResponse;

  if (!Array.isArray(rooms) || !rooms.length) {
    return {
      error: {
        code: 404,
        message: "No more rooms found",
        suggestion: "No more rooms to paginate",
      },
    };
  }

  // In case a room has changed, filter rooms the user no longer has access to
  const finalRooms = rooms.filter((room) =>
    userAllowedInRoom({
      accessAllowed: "read",
      userId: session.user.info.id,
      groupIds: session.user.info.groupIds,
      room,
    })
  );

  // Convert to our document format and return
  const documents = buildDocuments(finalRooms);
  const result: GetDocumentsResponse = {
    documents: documents,
    nextCursor: newNextCursor,
  };

  return { data: result };
}

