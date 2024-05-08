/// <reference path="./Avatar.d.ts" />

// Export all exported members from the Avatar module
export * from "./Avatar";



// Avatar.ts

// Define the Avatar interface
export interface Avatar {
  id: number;
  name: string;
  imageUrl: string;
}

// Define a default export for the Avatar module
export default function getAvatar(): Avatar {
  return {
    id: 1,
    name: "John Doe",
    imageUrl: "https://example.com/avatar.jpg",
  };
}

// Generate a declaration file for the Avatar module
declare module "*.ts" {
  import type { Avatar, getAvatar } from "./Avatar";
  const value: Avatar | typeof getAvatar;
  export default value;
}

