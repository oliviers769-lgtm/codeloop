import React, { useRef, useEffect } from 'react';

const INTERVAL_MS = 2 * 60 * 1000;

export default function LogoAnimated({ height = 44 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    const interval = setInterval(() => {
      video.currentTime = 0;
      video.play().catch(() => {});
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <video
      ref={videoRef}
      src="/logo.mp4"
      muted
      playsInline
      preload="auto"
      style={{
        height,
        width: 'auto',
        display: 'block',
        objectFit: 'contain',
        flexShrink: 0,
        pointerEvents: 'none', // ← empêche le clic sur la vidéo
      }}
    />
  );
}
