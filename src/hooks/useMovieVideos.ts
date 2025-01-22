import { useEffect, useState } from 'react';

import { Video } from '../types/video';
import { fetchMovieVideos } from '../api/fetchMovieVideos';

export const useMovieVideos = (
  movieId: string | null
): {
  video: Video | null;
  loading: boolean;
  error: string | null;
} => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!movieId) {
        setVideo(null); // Ensure video is reset if movieId is null
        return;
      }

      try {
        setLoading(true);
        const fetchedVideo = await fetchMovieVideos(movieId);
        setVideo(fetchedVideo);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching video for movie ${movieId}:`, err);
        setError('Failed to fetch video');
        setLoading(false);
      }
    };

    fetchVideo();
  }, [movieId]);

  return { video, loading, error };
};
