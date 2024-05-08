"use client";

import clsx from "clsx";
import { ComponentProps, FC, ReactNode, useCallback, useState } from "react";
import { DashboardHeader, DashboardSidebar } from "@/components/Dashboard";
import { Group } from "@/types";
import styles from "./Dashboard.module.css";

type Props = ComponentProps<"div"> & {
  groups: Group[];
  children: ReactNode;
};

type DashboardSidebarProps = ComponentProps<typeof DashboardSidebar> & {
  groups: Group[];
  defaultIsOpen?: boolean;
};

const DashboardLayout: FC<Props> = ({
  children,
  groups,
  className,
  ...props
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      setMenuOpen((isOpen) => !isOpen);
      event.preventDefault();
    },
    []
  );

  return (
    <div
      className={clsx(className, styles.container)}
      data-testid="dashboard-layout"
      {...props}
    >
      <header className={styles.header}>
        <DashboardHeader isOpen={isMenuOpen} onMenuClick={handleMenuClick} />
      </header>
      <aside className={styles.aside} data-open={isMenuOpen ? "true" : undefined}>
        <DashboardSidebar groups={groups} defaultIsOpen={isMenuOpen} />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

const DashboardSidebarWithGroups: FC<DashboardSidebarProps> = ({
  groups,
  defaultIsOpen,
  ...props
}) => {
  return (
    <DashboardSidebar {...props}>
      {groups.map((group) => (
        <DashboardSidebar.Group key={group.id} {...group} />
      ))}
    </DashboardSidebar>
  );
};

export { DashboardLayout, DashboardSidebarWithGroups };
