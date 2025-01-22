import { Loader } from '../ui';
import { MovieCard } from './MovieCard';
import { useMovieVideos } from '../../hooks/useMovieVideos';
import { useMovies } from '../../hooks/useMovies';

export const MovieList: React.FC = () => {
  const { movies, loading, error } = useMovies();

  // Always call the useMovieVideos hook with a fallback
  const featuredMovieId = movies?.[0]?.id || null;
  const {
    video,
    loading: videoLoading,
    error: videoError,
  } = useMovieVideos(featuredMovieId);

  // Handle loading and error states
  if (loading || videoLoading) {
    return <Loader />;
  }

  if (error || videoError) {
    return <div>Error: {error || videoError}</div>;
  }

  // Exclude the featured movie from the grid
  //const otherMovies = movies?.slice(1) || [];

  return (
    <div>
      {/* Featured Movie */}
      {movies && movies[0] && video && (
        <MovieCard {...movies[0]} video={video} />
      )}

      {/* Movie Grid */}
      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {otherMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div> */}
    </div>
  );
};
