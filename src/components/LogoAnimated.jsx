import React, { useRef, useEffect } from 'react';

const INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

export default function LogoAnimated({ height = 44 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    const handleEnded = () => {
      // Reste sur la dernière frame — ne reboucle pas
    };
    video.addEventListener('ended', handleEnded);

    const interval = setInterval(() => {
      video.currentTime = 0;
      video.play().catch(() => {});
    }, INTERVAL_MS);

    return () => {
      video.removeEventListener('ended', handleEnded);
      clearInterval(interval);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/logo.mp4"
      height={height}
      muted
      playsInline
      preload="auto"
      style={{ height, width: 'auto', display: 'block', objectFit: 'contain' }}
    />
  );
}
