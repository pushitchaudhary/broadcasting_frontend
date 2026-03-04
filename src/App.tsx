// import React, { useEffect, useRef } from 'react';
// import Hls from 'hls.js';

// const LivePlayer: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
  
//   // DYNAMIC URL: 
//   // window.location.hostname will be 'localhost' on your Mac 
//   // and '192.168.x.x' on your phone.
//   // const videoSrc = `http://${window.location.hostname}:9000/streams/live.m3u8`; 

//   var videoSrc = 'https://93ctnmfh-9000.inc1.devtunnels.ms/streams/live.m3u8';

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(videoSrc);
//       hls.attachMedia(video);
      
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         video.play().catch(e => console.log("Autoplay prevented:", e));
//       });

//       return () => hls.destroy();
//     } 
//     else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       video.src = videoSrc;
//     }
//   }, [videoSrc]);

//   return (
//    <>
//     <div style={{ textAlign: 'center', background: '#000', padding: '20px' }}>
//       <video 
//         ref={videoRef} 
//         controls 
//         autoPlay 
//         muted 
//         style={{ width: '100%', maxWidth: '800px' }} 
//       />
//     </div>
//     <div>
//       <p style={{ color: '#fff' }}>
//         If you see a black screen, make sure your phone is on the same Wi-Fi network as your Mac and that the stream is running.
//       </p>  
//     </div></>
//   );
// };

// export default LivePlayer;




import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const LivePlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Use your public Dev Tunnel URL
  const videoSrc = 'https://93ctnmfh-9000.inc1.devtunnels.ms/streams/live.m3u8';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      // CRITICAL: Configuration to bypass the VS Code Tunnel warning page
      const hls = new Hls({
        xhrSetup: (xhr) => {
          xhr.setRequestHeader('bypass-tunnel-reminder', 'true');
        },
      });

      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      });

      return () => hls.destroy();
    } 
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Note: Native Safari might still block this because you can't 
      // easily set custom headers on a raw <video> tag src.
      video.src = videoSrc;
    }
  }, [videoSrc]);

  return (
    <div style={{ textAlign: 'center', background: '#111', padding: '20px', borderRadius: '8px' }}>
      <video 
        ref={videoRef} 
        controls 
        autoPlay 
        muted 
        style={{ width: '100%', maxWidth: '800px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
      />
      <p style={{ color: '#aaa', marginTop: '10px' }}>
        Live Stream via VS Code Dev Tunnel
      </p>
    </div>
  );
};

export default LivePlayer;