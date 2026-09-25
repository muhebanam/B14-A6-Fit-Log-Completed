"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="site-shell flex min-h-[62vh] items-center justify-center py-16 text-center">
      <div className="w-full max-w-xl border border-line bg-panel px-7 py-12">
        <span className="text-[10px] font-black uppercase tracking-[.2em] text-acid">Training interrupted</span>
        <h1 className="display-font mt-3 text-5xl font-black uppercase">Something went off set</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-500">Try the request again. Your local plan is stored in this browser.</p>
        <button type="button" onClick={reset} className="focus-ring mt-6 bg-acid px-5 py-3 text-[10px] font-black uppercase tracking-[.14em] text-black">Try again</button>
      </div>
    </section>
  );
}
