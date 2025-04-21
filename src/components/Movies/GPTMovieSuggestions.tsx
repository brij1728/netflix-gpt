import { Movie } from '../../types/movies';
import { MovieListSwiper } from './MovieListSwiper';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const GPTMovieSuggestions = () => {
  const gpt = useSelector((store: RootState) => store.gpt);
  const { movieResults, movieNames } = gpt;
  console.log(movieResults);

  if (!movieNames.length || !movieResults.length) return null;
  return (
    <>
      {movieNames.map((movie: string, index) => {
        const relatedMovies: Movie[] = movieResults[index];

        return (
          <MovieListSwiper movies={relatedMovies} title={movie} key={movie} />
        );
      })}
    </>
  );
};
