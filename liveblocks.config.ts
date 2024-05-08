import {
  LiveMap,
  LiveObject,
  ThreadData,
  createClient,
} from "@liveblocks/client";
import { createLiveblocksContext, createRoomContext } from "@liveblocks/react";
import Router from "next/router";
import { DOCUMENT_URL } from "@/constants";
import {
  authorizeLiveblocks,
  getSpecificDocuments,
} from "@/lib/actions";
import { getUsers } from "./lib/database";
import { User } from "./types";

type Data = {
  user: User;
  error?: string;
};

const client = createClient({
  authEndpoint: async () => {
    const { data, error } = await authorizeLiveblocks();

    if (error) {
      Router.push({
        query: {
          ...Router.query,
          error: encodeURIComponent(JSON.stringify(error)),
        },
      });
      return;
    }

    return data;
  },

  resolveUsers: async ({ userIds }) => {
    const users = await getUsers({ userIds });
    return users.map((user) => user || {});
  },

  resolveMentionSuggestions: async ({ text }) => {
    const users = await getUsers({ search: text });
    return users.map((user) => user?.id || "");
  },

  resolveRoomsInfo: async ({ roomIds }) => {
    const documents = await getSpecificDocuments({ documentIds: roomIds });
    return documents.map((document) => ({
      name: document?.name,
      url: document ? DOCUMENT_URL(document.type, document.id) : undefined,
    }));
  },
});

export type Presence = {
  cursor: { x: number; y: number } | null;
};

export type Note = LiveObject<{
  x: number;
  y: number;
  text: string;
  selectedBy: UserMeta["info"] | null;
  id: string;
}>;

export type Notes = LiveMap<string, Note>;

type Storage = {
  notes: Notes;
};

export type UserInfo = Pick<User, "name" | "avatar" | "color">;

export type UserMeta = {
  info: UserInfo;
};

export type RoomEvent = {
  type: "SHARE_DIALOG_UPDATE";
};

type ThreadMetadata = {
  resolved: boolean;
  highlightId: string;
};

export type CustomThreadData = ThreadData<ThreadMetadata>;

type ThreadMetadata = {
  resolved: boolean;
  highlightId: string;
};

export type CustomThreadData = ThreadData<ThreadMetadata>;

export const {
  suspense: {
    RoomProvider,
    useBroadcastEvent,
    useEventListener,
    useHistory,
    useCanUndo,
    useCanRedo,
    useCreateThread,
    useMutation,
    useOthers,
    useRoom,
    useSelf,
    useStorage,
    useThreads,
    useUpdateMyPresence,
    useUser,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);

export const {
  suspense: {
    LiveblocksProvider,
    useInboxNotifications,
    useUnreadInboxNotificationsCount,
    useMarkAllInboxNotificationsAsRead,
  },
} = createLiveblocksContext(client);
