/**
 * These types are used in `/data`
 */

type UserId = string;
type GroupId = string;

export type User = {
  readonly id: UserId;
  readonly name: string;
  readonly avatar?: string;
  readonly color: string;
  readonly groupIds: GroupId[];
};

export type Group = {
  readonly id: GroupId;
  readonly name: string;
};

