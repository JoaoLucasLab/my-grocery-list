"use client";

import Link from "next/link";
import { ShareButton } from "./ShareButton";

type HeaderProps = {
  showShare?: boolean;
};

export function Header({ showShare = true }: HeaderProps) {
  return (
    <header className="border-b border-emerald-200/60 bg-white shadow-sm dark:border-emerald-900/40 dark:bg-slate-900">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
            <LogoIcon />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Grocery list
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Plan your shopping
            </p>
          </div>
        </Link>
        {showShare && (
          <ShareButton className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 dark:hover:bg-emerald-900/50" />
        )}
      </div>
    </header>
  );
}

function LogoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}
