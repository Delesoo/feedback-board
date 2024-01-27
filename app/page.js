'use client';

import { SessionProvider } from "next-auth/react";
import Board from "@/app/components/Board";

export default function Home() {
  return (
    <SessionProvider>
      <Board />
    </SessionProvider>
  );
}
