import { Group, User } from "./data";

type DocumentAccessKey = "default" | DocumentGroup["id"] | DocumentUser["id"];

/**
 * This is the main type of your Documents.
 * Make sure to edit /lib/server/utils/buildDocuments.ts when adding new
 * properties.
 */
export type Document = {
  id: string;
  name: string;
  accesses: DocumentAccesses;
  owner: DocumentUser["id"];
  created: string;
  lastConnection: string;
  draft: boolean;
  type: DocumentType;
};

export type DocumentType = "text" | "whiteboard" | "spreadsheet";

export type DocumentGroup = Group & {
  access: DocumentAccess;
};

export type DocumentUser = User & {
  access: DocumentAccess;
  isCurrentUser: boolean;
};

export enum DocumentAccess {
  FULL = "full",
  EDIT = "edit",
  READONLY = "readonly",
  NONE = "none",
}

export type DocumentAccesses = {
  [K in DocumentAccessKey]: DocumentAccess;
};

// Room metadata used when creating a new document
export interface DocumentRoomMetadata
  extends Record<string, string | string[]> {
  name: Document["name"];
  type: DocumentType;
  owner: User["id"];
  draft: "yes" | "no";
}

export type ErrorData = {
  message: string;
  code?: number;
  suggestion?: string;
};

