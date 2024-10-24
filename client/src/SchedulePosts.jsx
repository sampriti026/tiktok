import React from 'react';
import crypto from 'crypto-js';

const SchedulePosts = () => {
  const CLIENT_KEY = process.env.REACT_APP_TIKTOK_CLIENT_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'https://tiktok26.vercel.app/api/tiktok-auth/callback';

  const handleTikTokLogin = () => {
    const csrfState = Math.random().toString(36).substring(2);
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    localStorage.setItem('csrfState', csrfState);
    localStorage.setItem('codeVerifier', codeVerifier);

    const scope = 'user.info.basic,video.upload,video.publish';

    const url = new URL('https://www.tiktok.com/v2/auth/authorize/');
    url.searchParams.append('client_key', CLIENT_KEY);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', scope);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('state', csrfState);
    url.searchParams.append('code_challenge', codeChallenge);
    url.searchParams.append('code_challenge_method', 'S256');

    console.log('Login URL:', url.toString()); // For debugging

    window.location.href = url.toString();
  };

  const generateCodeVerifier = () => {
    return crypto.lib.WordArray.random(32).toString(crypto.enc.Base64url);
  };

  const generateCodeChallenge = (codeVerifier) => {
    return crypto.SHA256(codeVerifier).toString(crypto.enc.Base64url);
  };

  return (
    <div>
      <h1>TikTok Video Scheduler</h1>
      <button onClick={handleTikTokLogin}>Login with TikTok</button>
    </div>
  );
};

export default SchedulePosts;
