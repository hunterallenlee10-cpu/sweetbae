"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Living micro-loop. Autoplays muted while on screen, pauses off screen.
 * Under reduced motion it never mounts the video, so the still underneath stays.
 */
export function Loop({ slug, className = "", active = true }: { slug: string; className?: string; active?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && active) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [ok, active]);

  if (!ok) return null;
  return (
    <video
      ref={ref}
      className={`graded absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
      src={`/loops/${slug}.mp4`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setReady(true)}
    />
  );
}
