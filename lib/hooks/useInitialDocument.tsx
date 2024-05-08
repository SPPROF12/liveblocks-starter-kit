import { ReactNode, createContext, useContext } from "react";
import { Document } from "@/types";

type DocumentContextType = Document | null;

const DocumentContext = createContext<DocumentContextType>(null);

type Props = {
  initialDocument: Document;
  children: ReactNode;
};

export function InitialDocumentProvider({
  initialDocument,
  children,
}: Props) {
  return (
    <DocumentContext.Provider value={initialDocument}>
      {children}
    </DocumentContext.Provider>
  );
}

type UseInitialDocumentReturnType = Document & { hasDocument: true };

export function useInitialDocument(): UseInitialDocumentReturnType {
  const document = useContext(DocumentContext);

  if (!document) {
    throw new Error("No document passed to DocumentProvider");
  }

  return { ...document, hasDocument: true };
}

