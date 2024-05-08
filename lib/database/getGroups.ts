import { groups } from "@/data/groups";
import { Group } from "@/types";

/**
 * Get Groups
 *
 * Simulates calling your database and returning a filtered list of groups
 *
 * @param ids - The group ids to filter by
 * @returns A promise that resolves to an array of groups that match the provided ids
 */
export async function getGroups(ids: string[]): Promise<Group[]> {
  // Use Promise.all to improve performance when filtering multiple groups
  const groupsPromises = ids.map(id => findGroupById(id));
  const groups = await Promise.all(groupsPromises);
  // Filter out any groups that were not found
  return groups.filter((group): group is Group => group !== undefined);
}

/**
 * Find Group By Id
 *
 * Simulates calling your database and returning a single group by id
 *
 * @param id - The group id to search for
 * @returns A promise that resolves to the group with the provided id, or undefined if not found
 */
async function findGroupById(id: string): Promise<Group | undefined> {
  return groups.find((group): group is Group => group.id === id);
}
