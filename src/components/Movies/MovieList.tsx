import { Loader } from '../ui';
import { MovieCard } from './MovieCard';
import { useMovies } from '../../hooks/useMovies';

export const MovieList: React.FC = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div>{movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)}</div>
  );
};
