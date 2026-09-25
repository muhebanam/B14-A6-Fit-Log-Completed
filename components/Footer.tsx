import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.07] bg-[#07090c]">
      <div className="site-shell flex min-h-24 flex-col items-center justify-between gap-5 py-7 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center bg-acid">
            <Image src="/images/logo.png" alt="" width={28} height={28} />
          </span>
          <span className="display-font text-xl font-black">FITLOG</span>
        </div>
        <p className="text-center text-xs text-zinc-500 sm:text-right">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
