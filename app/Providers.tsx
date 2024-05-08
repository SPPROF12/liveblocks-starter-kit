"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { SessionProvider as NextAuthSessionProvider, Session } from "next-auth";
import { LiveblocksProvider } from "@/liveblocks.config";
import { ReactNode } from "react";

export function Providers({ children, session }) {
  return (
    <NextAuthSessionProvider session={session}>
      <LiveblocksProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </LiveblocksProvider>
    </NextAuthSessionProvider>
  );
}
