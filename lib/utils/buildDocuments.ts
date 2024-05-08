import { RoomInfo } from "@liveblocks/node";
import { Document, DocumentRoomMetadata } from "@/types";
import { roomAccessesToDocumentAccess } from "./convertAccessType";

/**
 * Convert Liveblocks rooms into our custom document format
 *
 * @param rooms - Liveblocks rooms
 */
export function buildDocuments(rooms: RoomInfo[]): Document[] {
  if (!rooms) return [];

  return rooms.map((x) => {
    return buildDocument(x);
  });
}

export function buildDocument(room: RoomInfo): Document {
  let name: Document["name"] = "Untitled";
  let owner: Document["owner"] = "";
  let draft: Document["draft"] = false;

  // Get document info from metadata
  const metadata = room.metadata as DocumentRoomMetadata;

  if (metadata.name) {
    name = metadata.name;
  }

  if (metadata.owner) {
    owner = metadata.owner;
  }

  if (metadata.draft === "yes") {
    draft = true;
  }

  // Get default, group, and user access from metadata
  const defaultAccess: Document["accesses"]["default"] =
    roomAccessesToDocumentAccess(room.defaultAccesses);

  const groups: Document["accesses"]["groups"] = Object.fromEntries(
    Object.entries(room.groupsAccesses).filter(([_, accessValue]) => accessValue)
      .map(([id, accessValue]) => [id, roomAccessesToDocumentAccess(accessValue)])
  );

  if (Object.keys(groups).length === 0) {
    delete groups;
  }

  const users: Document["accesses"]["users"] = Object.fromEntries(
    Object.entries(room.usersAccesses).filter(([_, accessValue]) => accessValue)
      .map(([id, accessValue]) => [id, roomAccessesToDocumentAccess(accessValue)])
  );

  if (Object.keys(users).length === 0) {
    delete users;
  }

  const { id, createdAt } = room;
  const created = createdAt.toString();
  const lastConnection = room.lastConnectionAt?.toString() || created;

  // Return our custom Document format
  return {
    id,
    created,
    lastConnection,
    type: metadata.type,
    name,
    owner,
    draft,
    accesses: {
      default: defaultAccess,
      groups: groups || {},
      users: users || {},
    },
  };
}

