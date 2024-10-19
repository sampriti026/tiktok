import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { code, state } = req.query;
  const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
  const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI || 'https://tikok26.app/api/callback';

  try {
    const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: new URLSearchParams({
        client_key: CLIENT_KEY,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      // Store these values securely on your server
      console.log('Access Token:', tokenData.access_token);
      console.log('Refresh Token:', tokenData.refresh_token);
      console.log('Open ID:', tokenData.open_id);

      res.redirect(`/dashboard?token=${tokenData.access_token}&openId=${tokenData.open_id}`);
    } else {
      console.error('Token Exchange Error:', tokenData);
      res.status(400).json({ error: 'Failed to obtain access token', details: tokenData });
    }
  } catch (error) {
    console.error('Error in token exchange:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
