"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { Select } from "@/primitives/Select";
import styles from "./signin.module.css";

// Used only for demo authentication, displays a dropdown of users
export function DemoLogin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from the API or replace this with your own data source
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.actions}>
      <Select
        items={users.map((user) => ({ value: user.id, title: user.name }))}
        onChange={(value) => {
          const selectedUser = users.find((user) => user.id === value);
          if (selectedUser) {
            signIn("credentials", { email: selectedUser.email });
          }
        }}
        placeholder="Choose a profile…"
      />
    </div>
  );
}

