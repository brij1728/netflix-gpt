import { THE_MOVIE_DB_URL } from '../utils/constants';
import { Video } from '../types/video';

export const fetchMovieVideos = async (
  movieId: string
): Promise<Video | null> => {
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

    if (!Array.isArray(data.results) || data.results.length === 0) {
      return null; // No videos available
    }

    // video types
    const prioritizedTypes = ['Trailer'];

    const prioritizedVideo = data.results.find((video: Video) =>
      prioritizedTypes.includes(video.type)
    );
    //console.log(prioritizedVideo || data.results[0]);
    return prioritizedVideo || data.results[0];
  } catch (err) {
    console.error('Error fetching movie videos:', err);
    return null;
  }
};
