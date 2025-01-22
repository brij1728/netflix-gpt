import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Video } from '../types/video';
import { fetchMovieVideos } from '../api/fetchMovieVideos';
import { setMovieVideos } from '../redux/slices/moviesSlice';

export const useMovieVideos = (): {
  movieVideos: Record<string, Video | null>; // One video per movie
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
            if (movieVideos[movie.id]) {
              return { movieId: movie.id, video: movieVideos[movie.id] };
            }

            try {
              const video = await fetchMovieVideos(movie.id);
              return { movieId: movie.id, video };
            } catch (err) {
              console.error(
                `Failed to fetch video for movie ${movie.id}:`,
                err
              );
              return { movieId: movie.id, video: null };
            }
          })
        );

        // Dispatch fetched videos to Redux
        videos.forEach(({ movieId, video }) => {
          dispatch(setMovieVideos({ movieId, video }));
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
