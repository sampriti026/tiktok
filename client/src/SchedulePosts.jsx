import React from 'react';
import crypto from 'crypto-js';

const SchedulePosts = () => {
  const CLIENT_KEY = process.env.REACT_APP_TIKTOK_CLIENT_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'https://your-vercel-app.vercel.app/api/callback';

  const generateCodeVerifier = () => {
    return crypto.lib.WordArray.random(32).toString(crypto.enc.Base64url);
  };

  const generateCodeChallenge = (codeVerifier) => {
    return crypto.SHA256(codeVerifier).toString(crypto.enc.Base64url);
  };

  const handleTikTokLogin = () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    
    localStorage.setItem('codeVerifier', codeVerifier);

    const csrfState = Math.random().toString(36).substring(2);
    localStorage.setItem('csrfState', csrfState);

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${CLIENT_KEY}`;
    url += '&scope=user.info.basic,video.upload,video.publish';
    url += '&response_type=code';
    url += `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    url += `&state=${csrfState}`;
    url += `&code_challenge=${codeChallenge}`;
    url += '&code_challenge_method=S256';

    window.location.href = url;
  };

  return (
    <div>
      <h1>TikTok Video Scheduler</h1>
      <button onClick={handleTikTokLogin}>Login with TikTok</button>
    </div>
  );
};

export default SchedulePosts;
