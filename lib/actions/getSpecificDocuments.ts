"use server";

import { Document } from "@/types";
import { getDocument } from "./getDocument";
import { log } from "@vercel/analytics";

type Props = {
  documentIds: Document["id"][];
};

/**
 * Get Specific Documents
 *
 * Get a list of documents by their IDs
 *
 * @param documentIds - The IDs of the documents
 */
export async function getSpecificDocuments({ documentIds }: Props) {
  const promises = documentIds.map((documentId) =>
    getDocument({ documentId })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        log("Error fetching document", { documentId });
        return null;
      })
  );

  const documents = await Promise.all(promises);

  log("Successfully fetched documents", { documentIds: documentIds.filter(Boolean) });

  return documents;
}

