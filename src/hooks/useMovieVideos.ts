import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Video } from '../types/video';
import { fetchMovieVideos } from '../api/fetchMovieVideos';
import { setMovieVideos } from '../redux/slices/moviesSlice';

export const useMovieVideos = (): {
  movieVideos: Record<string, Video[]>;
  loading: boolean;
  error: string | null;
} => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(
    (state: RootState) => state.movies.nowPlayingMovies
  );
  const movieVideos = useSelector(
    (state: RootState) => state.movies.movieVideos
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!movies) return;

      try {
        setLoading(true);

        const videos = await Promise.all(
          movies.map(async (movie) => {
            // Check if videos for this movie are already in Redux
            if (movieVideos[movie.id]) {
              return { movieId: movie.id, videos: movieVideos[movie.id] };
            }

            try {
              const data: Video[] = await fetchMovieVideos(movie.id);
              return { movieId: movie.id, videos: data };
            } catch (err) {
              console.error(
                `Failed to fetch videos for movie ${movie.id}:`,
                err
              );
              return { movieId: movie.id, videos: [] };
            }
          })
        );

        // Dispatch fetched videos to Redux
        videos.forEach(({ movieId, videos }) => {
          dispatch(setMovieVideos({ movieId, videos }));
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie videos:', err);
        setError('Failed to fetch movie videos');
        setLoading(false);
      }
    };

    fetchVideos();
  }, [movies, movieVideos, dispatch]);

  return { movieVideos, loading, error };
};
