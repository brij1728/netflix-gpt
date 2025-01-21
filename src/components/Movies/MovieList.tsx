import { Loader } from '../ui';
import { MovieCard } from './MovieCard';
import { useMovies } from '../../hooks/useMovies';

export const MovieList: React.FC = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 md:p-4 lg:grid-cols-4">
      {movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)}
    </div>
  );
};
