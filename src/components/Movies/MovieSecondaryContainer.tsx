import { MovieList } from './MovieList';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const MovieSecondaryContainer = () => {
  const movies = useSelector((state: RootState) => state.movies);

  return (
    <div>
      <div className="z-2 relative -mt-40">
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Trending'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Drama'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Comedy'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Family'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Popular'} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};
