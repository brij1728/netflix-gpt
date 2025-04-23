import { Loader } from '../ui';
import { Movie } from '../../types/movies';
import { MovieListSwiper } from './MovieListSwiper';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const GPTMovieSuggestions = () => {
  const gpt = useSelector((store: RootState) => store.gpt);
  const { movieResults, movieNames, hasSearched, isLoading, lastQuery } = gpt;
  console.log(movieResults);

  if (!hasSearched && !isLoading) return null;
  if (isLoading) return <Loader />;
  return (
    <>
      <h2 className="mb-4 text-xl text-white-100">Results for "{lastQuery}"</h2>

      {movieNames.map((movie: string, index) => {
        const relatedMovies: Movie[] = movieResults[index];

        return (
          <MovieListSwiper movies={relatedMovies} title={movie} key={movie} />
        );
      })}
    </>
  );
};
