import { MovieList } from './MovieList';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const MovieSecondaryContainer = () => {
  const movies = useSelector((state: RootState) => state.movies);

  return (
    <div>
      <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
    </div>
  );
};
