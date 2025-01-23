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
    <div className="flex flex-col gap-1 pb-2 sm:gap-2 sm:pb-3 md:pb-4">
      <p className="pl-2 text-sm font-medium text-white-100 sm:text-base md:pl-4 md:text-xl lg:text-2xl xl:text-3xl">
        {title}
      </p>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-[1px] text-gray-500 sm:gap-[2px] md:gap-1">
          {movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)}
        </div>
      </div>
    </div>
  );
};
