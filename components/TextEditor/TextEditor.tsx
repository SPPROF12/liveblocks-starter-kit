"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { LiveblocksProvider, Room, Self } from "@liveblocks/yjs";
import {
  CharacterCount,
  Collaboration,
  CollaborationCursor,
  Highlight,
  Image,
  Link,
  Placeholder,
  TextAlign,
  Typography,
  Youtube,
} from "@tiptap/extension-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DocumentSpinner } from "@/primitives/Spinner";
import { LiveblocksCommentsHighlight } from "./comment-highlight";
import { CustomTaskItem } from "./CustomTaskItem";
import { SelectionMenu } from "./SelectionMenu";
import { ThreadList } from "./ThreadList";
import { Toolbar } from "./Toolbar";
import { WordCount } from "./WordCount";
import styles from "./TextEditor.module.css";

export function TextEditor() {
  return (
    <ClientSideSuspense fallback={<DocumentSpinner />}>
      {() => <Editor />}
    </ClientSideSuspense>
  );
}

// Collaborative text editor with simple rich text and live cursors
export function Editor() {
  const room = useRoom();
  const [provider, setProvider] = useState<ReturnType<typeof LiveblocksProvider> | null>(null);

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    if (!room) return;

    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!provider) {
    return null;
  }

  return <TiptapEditor provider={provider} />;
}

type EditorProps = {
  provider: ReturnType<typeof LiveblocksProvider>;
};

function TiptapEditor({ provider }: EditorProps) {
  const { name, color, avatar: picture } = useSelf((me: Self) => me.info);
  const canWrite = useSelf((me: Self) => me.canWrite);

  // Set up editor with plugins, and place user info into Yjs awareness and cursors
  const editor = useEditor({
    editable: canWrite,
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
    extensions: [
      // Custom Liveblocks comments extension
      LiveblocksCommentsHighlight.configure({
        HTMLAttributes: {
          class: "comment-highlight",
        },
      }),
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "tiptap-blockquote",
          },
        },
        code: {
          HTMLAttributes: {
            class: "tiptap-code",
          },
        },
        codeBlock: {
          languageClassPrefix: "language-",
          HTMLAttributes: {
            class: "tiptap-code-block",
            spellcheck: false,
          },
        },
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "tiptap-heading",
          },
        },
        // The Collaboration extension comes with its own history handling
        history: false,
        horizontalRule: {
          HTMLAttributes: {
            class: "tiptap-hr",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "tiptap-list-item",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "tiptap-ordered-list",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "tiptap-paragraph",
          },
        },
      }),
      CharacterCount,
      Highlight.configure({
        HTMLAttributes: {
          class: "tiptap-highlight",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing…",
        emptyEditorClass: "tiptap-empty",
      }),
      CustomTaskItem,
      TaskList.configure({
        HTMLAttributes: {
          class: "tiptap-task-list",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
      Youtube.configure({
        modestBranding: true,
        HTMLAttributes: {
          class: "tiptap-youtube",
        },
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: provider.awareness.getDocument(),
      }),
      // Attach provider and user info
      CollaborationCursor.configure({
        provider,
        user: {
          name,
          color,
          picture,
        },
      }),
    ],
  });

  return (
    <div className={styles.container}>
      {canWrite ? (
        <div className={styles.editorHeader}>
          {editor ? <Toolbar editor={editor} /> : null}
        </div>
      ) : null}
      <div className={styles.editorPanel}>
        {editor ? <SelectionMenu editor={editor} /> : null}
        <div className={styles.editorContainerOffset}>
          <div className={styles.editorContainer}>
            <EditorContent editor={editor} />
            <div className={styles.threadListContainer} data-threads="desktop">
              {editor ? <ThreadList editor={editor} /> : null}
            </div>
          </div>
          <div
            className={styles.mobileThreadListContainer}
            data-threads="mobile"
          >
            {editor ? <ThreadList editor={editor} /> : null}
          </div>
        </div>
      </div>
      {editor ? <WordCount editor={editor} /> : null}
    </div>
  );
}

// Prevents a matchesNode error on hot reloading
EditorView.prototype.updateState = function updateState(state) {
  // @ts-ignore
  if (!this.docView) return;
  // @ts-ignore
  this.updateStateInner(state, this.state.plugins != state.plugins);
};
