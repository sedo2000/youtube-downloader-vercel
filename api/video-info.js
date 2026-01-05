import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Video URL required" });

  const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (!videoIdMatch) return res.status(400).json({ error: "Invalid YouTube URL" });

  const videoId = videoIdMatch[1];
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
