import { ErrorUI, Loader } from '../ui';
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
} from '../../hooks/useMovies';

import { PrimaryMovieBanner } from './PrimaryMovieBanner';
import { useMovieVideos } from '../../hooks/useMovieVideos';

export const MoviePrimaryContainer = () => {
  const { movies, loading, error } = useNowPlayingMovies();

  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

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
    return (
      <ErrorUI errorMessage={error || videoError} redirectToLogin={true} />
    );
  }

  return (
    <div>
      {movies && movies[0] && video && (
        <PrimaryMovieBanner {...movies[0]} video={video} />
      )}
    </div>
  );
};
