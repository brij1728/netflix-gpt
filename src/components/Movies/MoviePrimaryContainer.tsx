import { ErrorUI, Loader } from '../ui';

import { PrimaryMovieBanner } from './PrimaryMovieBanner';
import { useMovieVideos } from '../../hooks/useMovieVideos';
import { useMovies } from '../../hooks/useMovies';

export const MoviePrimaryContainer: React.FC = () => {
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
    return <ErrorUI errorMessage={error || videoError} />;
  }

  return (
    <div>
      {movies && movies[0] && video && (
        <PrimaryMovieBanner {...movies[0]} video={video} />
      )}
    </div>
  );
};
