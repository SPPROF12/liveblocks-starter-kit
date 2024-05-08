import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import {
  DASHBOARD_DRAFTS_URL,
  DASHBOARD_GROUP_URL,
  DASHBOARD_URL,
} from "@/constants";
import { FileIcon, FolderIcon } from "@/icons";
import { LinkButton } from "@/primitives/Button";
import { Group } from "@/types";
import { normalizeTrailingSlash } from "@/utils";
import styles from "./DashboardSidebar.module.css";

interface Props extends ComponentPropsWithoutRef<"div"> {
  groups: Group[];
}

interface SidebarLinkProps
  extends Omit<ComponentPropsWithRef<typeof LinkButton>, "href"> {
  href: typeof DASHBOARD_URL | typeof DASHBOARD_DRAFTS_URL | typeof DASHBOARD_GROUP_URL extends const infer T
    ? T[number]
    : never;
  icon: ReactNode;
}

function SidebarLink({
  href,
  children,
  className,
  icon,
  ...props
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = useMemo(
    () => normalizeTrailingSlash(pathname) === normalizeTrailingSlash(href),
    [pathname, href]
  );

  return (
    <LinkButton
      className={clsx(className, styles.sidebarLink)}
      data-active={isActive || undefined}
      href={href}
      variant="subtle"
      as={href}
      {...props}
    >
      {icon}
      {children}
    </LinkButton>
  );
}

export function DashboardSidebar({ className, groups, ...props }: Props) {
  return (
    <div className={clsx(className, styles.sidebar)} {...props}>
      <nav className={styles.navigation}>
        <div className={styles.category}>
          <ul className={styles.list}>
            <li>
              <SidebarLink href={DASHBOARD_URL} icon={<FileIcon />}>
                All
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href={DASHBOARD_DRAFTS_URL} icon={<FileIcon />}>
                Drafts
              </SidebarLink>
            </li>
          </ul>
        </div>
        <div className={styles.category}>
          <span className={styles.categoryTitle}>Groups</span>
          <ul className={styles.list}>
            {groups.map((group) => {
              return (
                <li key={group.id}>
                  <SidebarLink
                    href={DASHBOARD_GROUP_URL(group.id)}
                    icon={<FolderIcon />}
                  >
                    {group.name}
                  </SidebarLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

interface Group {
  id: string;
  name: string;
}
