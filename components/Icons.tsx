import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = (size: number, props: IconProps) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ClockIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
export const FlameIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="M13.3 2.7c.8 3.2-.6 4.5-1.7 5.7-1.1-1.5-2.5-2.7-3.3-3.2.2 3.1-3.1 5.3-3.1 9.1A6.8 6.8 0 0 0 12 21a6.8 6.8 0 0 0 6.8-6.7c0-3.8-2.4-7.6-5.5-11.6Z"/><path d="M9.6 17.4c0-2 1.6-3 2.4-4.5 1.2 1 2.4 2.5 2.4 4.5A2.4 2.4 0 0 1 12 19.8a2.4 2.4 0 0 1-2.4-2.4Z"/></svg>;
export const StarIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></svg>;
export const ArrowDownIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="M12 4v15M6.5 13.5 12 19l5.5-5.5"/></svg>;
export const ChevronDownIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="m6 9 6 6 6-6"/></svg>;
export const PlusIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="M12 5v14M5 12h14"/></svg>;
export const BookmarkIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.8L6 21V4.8Z"/></svg>;
export const CheckIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="m5 12.5 4.1 4.1L19 6.8"/></svg>;
export const XIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="m6 6 12 12M18 6 6 18"/></svg>;
export const SearchIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>;
export const DumbbellIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="M6 7v10M3.5 9v6M18 7v10M20.5 9v6M6 12h12M2 12h1.5M20.5 12H22"/></svg>;
export const ArrowRightIcon = ({ size = 16, ...props }: IconProps) => <svg {...base(size, props)}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
