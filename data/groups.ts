// types.ts

export type GroupId = "product" | "engineering" | "design";

export interface Group {
  id: GroupId;
  name: string;
}

// data.ts

import { Group, GroupId } from "./types";

const groups: Group[] = [
  {
    id: "product" as GroupId,
    name: "Product",
  },
  {
    id: "engineering" as GroupId,
    name: "Engineering",
  },
  {
    id: "design" as GroupId,
    name: "Design",
  },
];

export default groups;
