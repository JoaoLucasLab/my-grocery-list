"use client";

import { useState } from "react";

type ShareButtonProps = {
  className?: string;
};

export function ShareButton({ className }: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "copied" | "error">("idle");

  const handleShare = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/share", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create link");
      const { token } = await res.json();
      const url = `${window.location.origin}/share/${token}`;
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={status === "loading"}
      className={className}
      title="Copy share link"
    >
      {status === "loading" && (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Creating link…
        </span>
      )}
      {status === "copied" && (
        <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <CheckIcon /> Link copied!
        </span>
      )}
      {status === "error" && (
        <span className="text-red-600 dark:text-red-400">Failed. Try again.</span>
      )}
      {status === "idle" && (
        <span className="flex items-center gap-2">
          <ShareIcon /> Share list
        </span>
      )}
    </button>
  );
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M15.75 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-3.75 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm9 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3.75 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9-15a2.25 2.25 0 0 0-2.25 2.25v15a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 18.75 4.5h-15Zm9 13.5a.75.75 0 0 0 .75-.75v-5.69l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 1 0 1.06 1.06l2.22-2.22v5.69c0 .414.336.75.75.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
