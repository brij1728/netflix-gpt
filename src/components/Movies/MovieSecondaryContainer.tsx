import { MovieList } from './MovieList';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const MovieSecondaryContainer = () => {
  const movies = useSelector((state: RootState) => state.movies);

  return (
    <div>
      <div className="z-2 relative -mt-40">
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />

        <MovieList title={'Trending'} movies={movies.popularMovies} />
        <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
        <MovieList title={'Upcoming'} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};
