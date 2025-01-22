import { Movie } from '../../types/movies';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  title: string;
  movies: Movie[] | null;
}
export const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
  if (!movies) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-medium sm:text-2xl md:text-3xl">{title}</h2>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-[1px] sm:gap-[2px] md:gap-1">
          {movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)}
        </div>
      </div>
    </div>
  );
};
