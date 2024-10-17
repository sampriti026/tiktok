import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      setAccessToken(token);
    }
  }, [location]);

  const handlePostVideo = async () => {
    try {
      const response = await fetch('/api/post-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, caption, accessToken }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Video posted successfully!');
      } else {
        alert(`Failed to post video: ${data.error}`);
      }
    } catch (error) {
      console.error('Error posting video:', error);
      alert('An error occurred while posting the video');
    }
  };

  return (
    <div>
      <h1>TikTok Dashboard</h1>
      {accessToken ? (
        <div>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Video URL"
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
          />
          <button onClick={handlePostVideo}>Post Video</button>
        </div>
      ) : (
        <p>Please log in to post videos</p>
      )}
    </div>
  );
};

export default Dashboard;
