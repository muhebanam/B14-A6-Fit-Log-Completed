export default function Loading() {
  return (
    <div className="site-shell flex min-h-[58vh] items-center justify-center py-20">
      <div className="text-center">
        <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-zinc-800 border-t-acid" />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[.2em] text-zinc-500">Loading FitLog…</p>
      </div>
    </div>
  );
}
