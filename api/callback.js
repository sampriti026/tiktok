import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { code, state } = req.query;
  const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
  const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI || 'https://your-vercel-app.vercel.app/api/callback';

  try {
    const tokenResponse = await fetch('https://open-api.tiktok.com/oauth/access_token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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

    if (tokenData.data && tokenData.data.access_token) {
      res.redirect(`/dashboard?token=${tokenData.data.access_token}`);
    } else {
      res.status(400).send('Failed to obtain access token');
    }
  } catch (error) {
    console.error('Error in token exchange:', error);
    res.status(500).send('Internal server error');
  }
}
