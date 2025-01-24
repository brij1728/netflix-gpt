import { MovieListSwiper } from './MovieListSwiper';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const MovieSecondaryContainer = () => {
  const movies = useSelector((state: RootState) => state.movies);

  return (
    <div>
      <div className="z-2 relative -mt-40">
        <MovieListSwiper
          title={'Now Playing'}
          movies={movies.nowPlayingMovies}
        />

        <MovieListSwiper title={'Trending'} movies={movies.popularMovies} />
        <MovieListSwiper title={'Top Rated'} movies={movies.topRatedMovies} />
        <MovieListSwiper title={'Upcoming'} movies={movies.upcomingMovies} />
        <MovieListSwiper
          title={'Now Playing'}
          movies={movies.nowPlayingMovies}
        />
      </div>
    </div>
  );
};
