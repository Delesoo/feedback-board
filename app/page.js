'use client';

import { SessionProvider } from "next-auth/react";
import Board from "@/app/components/Board";
import Header from "./components/Header";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <Board />
    </SessionProvider>
  );
}
