"use client";

import { useState } from "react";

export function WorkoutImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [imageSrc, setImageSrc] = useState(src || "/images/workout-fallback.png");
  return (
    // External API images can come from arbitrary hosts, so a native img keeps the client resilient.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setImageSrc("/images/workout-fallback.png")}
    />
  );
}
