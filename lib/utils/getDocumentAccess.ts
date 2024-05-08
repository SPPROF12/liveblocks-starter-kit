import { Document, DocumentAccess, User } from "@/types";

type DocumentAccessProps = {
  documentAccesses: Document["accesses"];
  groupIds: User["groupIds"];
  userId: User["id"];
};

type DocumentAccessResult = DocumentAccess | typeof DocumentAccess.NONE;

const accessLevelHierarchy = [
  DocumentAccess.NONE,
  DocumentAccess.READONLY,
  DocumentAccess.EDIT,
  DocumentAccess.FULL,
];

export function getDocumentAccess({
  documentAccesses,
  userId,
  groupIds,
}: DocumentAccessProps): DocumentAccessResult {
  if (!documentAccesses || !documentAccesses.default) {
    throw new Error("Missing required properties in documentAccesses");
  }

  let accessLevel = documentAccesses.default;

  if (groupIds && groupIds.length > 0) {
    for (const groupId of groupIds) {
      if (documentAccesses.groups && documentAccesses.groups[groupId] !== undefined) {
        const groupAccess = documentAccesses.groups[groupId];
        if (
          accessLevelHierarchy.indexOf(groupAccess as DocumentAccess) >
          accessLevelHierarchy.indexOf(accessLevel as DocumentAccess)
        ) {
          accessLevel = groupAccess;
        }
      }
    }
  }

  if (documentAccesses.users && documentAccesses.users[userId] !== undefined) {
    const userAccess = documentAccesses.users[userId];

    if (userAccess === DocumentAccess.EDIT) {
      userAccess = DocumentAccess.FULL;
    }

    if (
      accessLevelHierarchy.indexOf(userAccess as DocumentAccess) >
      accessLevelHierarchy.indexOf(accessLevel as DocumentAccess)
    ) {
      accessLevel = userAccess;
    }
  }

  return accessLevel;
}

