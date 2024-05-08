"use server";

import { RoomUser } from "@liveblocks/node";
import { auth } from "@/auth";
import { UserInfo } from "@/liveblocks.config";
import { LiveUserList, Props, Document } from "@/types";
import { liveblocks } from "@/liveblocks.server.config";

type GetActiveUsers = () => Promise<{ data: RoomUser<UserInfo>[] }>;

const getActiveUsers = (roomId: Document["id"]): GetActiveUsers =>
  () => liveblocks.getActiveUsers<UserInfo>(roomId);

export async function getLiveUsers({ documentIds }: Props): Promise<{ data: LiveUserList[] } | { error: { code: number, message: string, suggestion: string } }> {
  const promises = documentIds.map(getActiveUsers);

  let session;
  let currentActiveUsers = [];
  try {
    // Get session and rooms
    const [sess, ...roomUsers] = await Promise.all([auth(), ...promises]);
    session = sess;
    currentActiveUsers = roomUsers.map(({ data }) => data ?? []);
  } catch (err) {
    console.error(err);
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
        suggestion: "Sign in to access active users",
      },
    };
  }

  const result = documentIds.map((roomId, i) => ({
    documentId: roomId,
    users: currentActiveUsers[i],
  }));

  return { data: result };
}
