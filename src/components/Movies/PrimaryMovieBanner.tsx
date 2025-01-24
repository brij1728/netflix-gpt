import { Movie } from '../../types/movies';
import { Video } from '../../types/video';
import { VideoBackground } from './VideoBackground';
import { VideoTitle } from './VideoTitle';

interface PrimaryMovieBannerProps extends Movie {
  video?: Video | null;
}

export const PrimaryMovieBanner: React.FC<PrimaryMovieBannerProps> = ({
  video,
  ...movie
}) => {
  return (
    <div>
      <VideoTitle {...movie} />
      {video && <VideoBackground trailerKey={video.key} title={movie.title} />}
    </div>
  );
};
