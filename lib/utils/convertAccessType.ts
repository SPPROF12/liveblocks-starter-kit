import { RoomPermission } from "@liveblocks/node";
import { DocumentAccess } from "@/types";

/**
 * Convert from Liveblocks room accesses to a custom document access format
 * If the user was set on userAccesses, give FULL permissions to edit invited users
 * @param roomAccess - The room access to check
 * @param setOnUserAccess - If the user was set with userAccesses or not
 */
export function convertRoomAccessToDocumentAccess(
  roomAccess: RoomPermission | null,
  setOnUserAccess = false
): DocumentAccess {
  if (!roomAccess) {
    return DocumentAccess.NONE;
  }

  if (roomAccess[0] === "room:write") {
    return setOnUserAccess ? DocumentAccess.FULL : DocumentAccess.EDIT;
  }

  if (
    roomAccess[0] === "room:read" &&
    roomAccess[1] === "room:presence:write"
  ) {
    return DocumentAccess.READONLY;
  }

  return DocumentAccess.NONE;
}

/**
 * Convert from a custom document access format to native Liveblocks room accesses
 * @param documentAccess
 */
export function convertDocumentAccessToRoomAccesses(
  documentAccess: DocumentAccess
): RoomPermission {
  switch (documentAccess) {
    case DocumentAccess.FULL:
    case DocumentAccess.EDIT:
      return ["room:write"];
    case DocumentAccess.READONLY:
      return ["room:read", "room:presence:write"];
    default:
      throw new Error(`Invalid DocumentAccess value: ${documentAccess}`);
  }
}

// Unit tests
const testCases = [
  { input: null, expected: DocumentAccess.NONE },
  { input: ["room:write"], expected: DocumentAccess.EDIT },
  { input: ["room:write"], setOnUserAccess: true, expected: DocumentAccess.FULL },
  { input: ["room:read", "room:presence:write"], expected: DocumentAccess.READONLY },
];

testCases.forEach(({ input, setOnUserAccess, expected }) => {
  const result = convertRoomAccessToDocumentAccess(input, setOnUserAccess);
  expect(result).toEqual(expected);
});

const testCases2 = [
  { input: DocumentAccess.NONE, expected: [] },
  { input: DocumentAccess.EDIT, expected: ["room:write"] },
  { input: DocumentAccess.FULL, expected: ["room:write"] },
  { input: DocumentAccess.READONLY, expected: ["room:read", "room:presence:write"] },
];

testCases2.forEach(({ input, expected }) => {
  const result = convertDocumentAccessToRoomAccesses(input);
  expect(result).toEqual(expected);
});
