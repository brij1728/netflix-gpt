import { Loader } from '../ui';
import { Movie } from '../../types/movies';
import { MovieCard } from './MovieCard';
import { VideoBackground } from './VideoBackground';
import { useMovieVideos } from '../../hooks/useMovieVideos';
import { useMovies } from '../../hooks/useMovies';

export const MovieList: React.FC = () => {
  const { movies, loading: moviesLoading, error: moviesError } = useMovies();
  const {
    movieVideos,
    loading: videosLoading,
    error: videosError,
  } = useMovieVideos();

  if (moviesLoading || videosLoading) return <Loader />;
  if (moviesError) return <div>{moviesError}</div>;
  if (videosError) return <div>{videosError}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {movies?.map((movie: Movie) => {
        const trailer = movieVideos[movie.id]; // Get the first trailer

        return (
          <div key={movie.id}>
            <MovieCard {...movie} />
            {trailer && (
              <VideoBackground trailerKey={trailer.key} title={movie.title} />
            )}
          </div>
        );
      })}
    </div>
  );
};
