import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { videoUrl, caption, accessToken } = req.body;

  try {
    // First, upload the video
    const uploadResponse = await fetch('https://open-api.tiktok.com/share/video/upload/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: new FormData().append('video', await fetch(videoUrl)),
    });

    const uploadData = await uploadResponse.json();

    if (!uploadData.data || !uploadData.data.video_id) {
      return res.status(400).json({ error: 'Failed to upload video' });
    }

    // Then, create the post
    const postResponse = await fetch('https://open-api.tiktok.com/video/publish/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        video_id: uploadData.data.video_id,
        text: caption,
        privacy_level: 'public',
      }),
    });

    const postData = await postResponse.json();

    if (postData.data && postData.data.share_id) {
      res.status(200).json({ message: 'Video posted successfully', shareId: postData.data.share_id });
    } else {
      res.status(400).json({ error: 'Failed to post video' });
    }
  } catch (error) {
    console.error('Error posting video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
