"use server";

import { getGroup } from "@/lib/database";
import { DocumentGroup, Group } from "@/types";

/**
 * Get Groups
 *
 * Fetch groups from your database API
 * Uses custom API endpoint
 *
 * @param groupIds - The groups' ids
 */
export async function getGroups(groupIds: DocumentGroup["id"][]) {
  // Get all groups
  const groups = await Promise.all(groupIds.map(getGroup)).catch((error) => {
    throw new Error(`Error fetching groups: ${error.message}`);
  });

  // Filter out draft groups or any that didn't return
  return groups.filter((group) => group !== null && group !== undefined) as Group[];
}
