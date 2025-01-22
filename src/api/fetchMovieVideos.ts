import { THE_MOVIE_DB_URL } from '../utils/constants';
import { Video } from '../types/video';

export const fetchMovieVideos = async (movieId: string): Promise<Video[]> => {
  const url = `${THE_MOVIE_DB_URL}/${movieId}/videos`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch videos for movieId: ${movieId}`);
    }

    const data = await response.json();

    // Filter for YouTube trailers
    const trailerVideos = data.results.filter(
      (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    return trailerVideos;
  } catch (err) {
    console.error('Error fetching movie videos:', err);
    return []; // Return an empty array if there's an error
  }
};
