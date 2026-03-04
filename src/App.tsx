import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const LivePlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // DYNAMIC URL: 
  // window.location.hostname will be 'localhost' on your Mac 
  // and '192.168.x.x' on your phone.
  const videoSrc = `http://${window.location.hostname}:9000/streams/live.m3u8`; 

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      });

      return () => hls.destroy();
    } 
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
    }
  }, [videoSrc]);

  return (
    <div style={{ textAlign: 'center', background: '#000', padding: '20px' }}>
      <video 
        ref={videoRef} 
        controls 
        autoPlay 
        muted 
        style={{ width: '100%', maxWidth: '800px' }} 
      />
    </div>
  );
};

export default LivePlayer;