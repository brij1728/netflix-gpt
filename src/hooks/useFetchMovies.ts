import { useEffect, useState } from 'react';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AppDispatch } from '../redux/store';
import { Movie } from '../types/movies';
import { fetchMovies } from '../api/fetchMovies';
import { useDispatch } from 'react-redux';

interface UseFetchMoviesProps {
  endpoint: string;
  page?: number;
  reduxAction: ActionCreatorWithPayload<Movie[], string>;
}

export const useFetchMovies = ({
  endpoint,
  page = 1,
  reduxAction,
}: UseFetchMoviesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        setLoading(true);
        const moviesData: Movie[] = await fetchMovies({ endpoint, page });
        setMovies(moviesData);
        dispatch(reduxAction(moviesData)); // Dispatching the Redux action with the fetched data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
        console.error('Failed to fetch movies:', err);
      }
    };

    if (!movies) {
      fetchMoviesData();
    }
  }, [endpoint, reduxAction, dispatch, movies, page]);

  return { movies, loading, error };
};
