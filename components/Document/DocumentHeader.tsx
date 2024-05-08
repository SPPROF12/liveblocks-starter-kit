import { ClientSideSuspense } from "@liveblocks/react";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { InboxPopover } from "@/components/Inbox";
import { ShareIcon } from "@/icons";
import { renameDocument } from "@/lib/actions";
import { useInitialDocument } from "@/lib/hooks";
import { Button } from "@/primitives/Button";
import { Skeleton } from "@/primitives/Skeleton";
import { Document } from "@/types";
import { Logo } from "../Logo";
import { DocumentHeaderAvatars } from "./DocumentHeaderAvatars";
import { DocumentHeaderName } from "./DocumentHeaderName";
import styles from "./DocumentHeader.module.css";

interface Props extends ComponentProps<"header"> {
  documentId: Document["id"];
}

interface DocumentHeaderNameProps {
  onDocumentRename: (name: string) => void;
  loading?: boolean;
}

function isDocumentHeaderNameProps(
  props: ComponentProps<"div"> | DocumentHeaderNameProps
): props is DocumentHeaderNameProps {
  return (props as DocumentHeaderNameProps).onDocumentRename !== undefined;
}

export function DocumentHeader({ documentId, className, ...props }: Props) {
  const initialDocument = useInitialDocument();
  const [documentName, setDocumentName] = useState(initialDocument.name);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setDocumentName(initialDocument.name);
  }, [initialDocument.name]);

  return (
    <header className={clsx(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Link href="/" key="logo-link" title="Homepage" className={styles.logoLink}>
          <Logo />
        </Link>
      </div>
      <div className={styles.document}>
        {isDocumentHeaderNameProps(props) ? (
          <DocumentHeaderName
            onDocumentRename={(name) => {
              setDocumentName(name);
              renameDocument({ documentId, name });
            }}
            loading={loading}
          >
            {documentName}
          </DocumentHeaderName>
        ) : (
          <span className={styles.documentNameFallback}>{documentName}</span>
        )}
      </div>
      <div className={styles.collaboration}>
        <div className={styles.presence}>
          <ClientSideSuspense fallback={null}>
            {() => <DocumentHeaderAvatars />}
          </ClientSideSuspense>
        </div>
        <ClientSideSuspense fallback={null}>
          {() => (
            <ShareDialog>
              <Button icon={<ShareIcon />}>Share</Button>
            </ShareDialog>
          )}
        </ClientSideSuspense>

        <InboxPopover align="end" sideOffset={4} />
      </div>
    </header>
  );
}

export function DocumentHeaderSkeleton({
  className,
  ...props
}: LinkProps) {
  return (
    <header className={clsx(className, styles.header)} {...props}>
      <div className={styles.logo}>
        <Link href="/" key="logo-link" title="Homepage" className={styles.logoLink}>
          <Logo />
        </Link>
      </div>
      <div className={styles.document}>
        <Skeleton style={{ width: 120 }} />
      </div>
      <div className={styles.collaboration}>
        <Button icon={<ShareIcon />} disabled={true}>
          Share
        </Button>
      </div>
    </header>
  );
}
