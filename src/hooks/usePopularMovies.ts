import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchPopularMovies } from '../api/fetchPopularMovies';
import { setPopularMovies } from '../redux/slices/moviesSlice';

export const usePopularMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.popularMovies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesData = await fetchPopularMovies();
        dispatch(setPopularMovies(moviesData));
        setLoading(false);
      } catch (err: unknown) {
        setError('Failed to fetch movies');
        setLoading(false);
        console.error('Failed to fetch movies:', err);
      }
    };

    if (!movies) {
      fetchMovies();
    }
  }, [movies, dispatch]);

  return { movies, loading, error };
};
