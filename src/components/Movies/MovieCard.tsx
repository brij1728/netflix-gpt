import { Movie } from '../../types/movies';
import { Video } from '../../types/video';
import { VideoBackground } from './VideoBackground';
import { VideoTitle } from './VideoTitle';

interface MovieCardProps extends Movie {
  video?: Video | null;
}

export const MovieCard: React.FC<MovieCardProps> = ({ video, ...movie }) => {
  return (
    <div>
      <VideoTitle {...movie} />
      {video && <VideoBackground trailerKey={video.key} title={movie.title} />}
    </div>
  );
};
