import { RoomInfo } from "@liveblocks/node";
import { DocumentUser } from "@/types";

interface IsUserDocumentOwnerProps {
  room: RoomInfo;
  userId: DocumentUser["id"];
}

/**
 * Returns true if the owner of the room is equal to the given user id
 *
 * @param room - The room to test
 * @param userId - The user's id to check
 */
export function isUserDocumentOwner({ room, userId }: IsUserDocumentOwnerProps): boolean {
  // Return false if room or owner is not defined
  if (!room || !room.metadata || !room.metadata.owner) {
    return false;
  }

  // Get the first owner if owner is an array
  const owner = Array.isArray(room.metadata.owner) ? room.metadata.owner[0] : room.metadata.owner;

  // Check if the owner is equal to the user id
  return owner === userId;
}
