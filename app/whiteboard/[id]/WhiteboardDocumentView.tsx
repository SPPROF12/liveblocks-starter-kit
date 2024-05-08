"use client";

import { LiveMap } from "@liveblocks/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentHeader, DocumentHeaderSkeleton } from "@/components/Document";
import { Whiteboard } from "@/components/Whiteboard";
import { DocumentLayout } from "@/layouts/Document";
import { ErrorLayout } from "@/layouts/Error";
import { InitialDocumentProvider } from "@/lib/hooks";
import { RoomProvider } from "@/liveblocks.config";
import { Document, ErrorData } from "@/types";

type Props = {
  initialDocument: Document | null;
  initialError: ErrorData | null;
};

export function WhiteboardDocumentView({
  initialDocument,
  initialError,
}: Props) {
  const { id, error: queryError } = useParams<{ id: string; error: string }>() || {};
  const [error, setError] = useState<ErrorData | null>(initialError);

  useEffect(() => {
    if (queryError) {
      setError(JSON.parse(decodeURIComponent(queryError)));
    }
  }, [queryError]);

  if (error) {
    return <ErrorLayout error={error} />;
  }

  if (!id || !initialDocument) {
    return <DocumentLayout header={<DocumentHeaderSkeleton />} />;
  }

  return (
    <RoomProvider
      id={id}
      initialPresence={{ cursor: null }}
      initialStorage={{ notes: new LiveMap() }}
    >
      <InitialDocumentProvider initialDocument={initialDocument}>
        <DocumentLayout
          header={<DocumentHeader documentId={initialDocument.id} />}
        >
          <Whiteboard />
        </DocumentLayout>
      </InitialDocumentProvider>
    </RoomProvider>
  );
}

