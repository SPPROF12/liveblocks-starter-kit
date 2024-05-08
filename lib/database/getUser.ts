import { colors } from "@/data/colors";
import { User } from "@/types/User";
import { v4 as uuidv4 } from "uuid";

/**
 * Get User
 *
 * Simulates calling your database and returning a user with a seeded random colour
 *
 * @param userId - The user's id
 * @returns A user object with a random color
 */
export async function getUser(userId: string): Promise<User | null> {
  const user = users.find((user) => user.id === userId);

  if (!user) {
    console.warn(`
ERROR: User "${userId}" was not found. 

Check that you've added the user to data/users.ts, for example:
{
  id: "${userId}",
  name: "Tchoka Ahoki",
  avatar: "https://liveblocks.io/avatars/avatar-7.png",
  groupIds: ["product", "engineering", "design"],
},
 
`);
    return null;
  }

  const color = getRandom(colors, userId);
  return { ...user, color, id: user.id || uuidv4() };
}

export function getRandom<T>(array: T[] = [], seed?: string): T {
  if (!array.length) {
    console.warn("ERROR: The array passed to getRandom is empty.");
    return array[0];
  }

  const index = seed
    ? Math.abs(hashCode(seed)) % array.length
    : Math.floor(Math.random() * array.length);

  return array[index];
}

function hashCode<T>(string: string): number {
  let hash = 0;

  if (string.length > 0) {
    let index = 0;

    while (index < string.length) {
      hash = ((hash << 5) - hash + string.charCodeAt(index++)) | 0;
    }
  }

  return hash;
}

