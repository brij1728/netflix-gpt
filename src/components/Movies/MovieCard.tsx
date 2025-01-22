import { Movie } from '../../types/movies';
import { Video } from '../../types/video';

interface MovieCardProps extends Movie {
  video?: Video | null;
}

export const MovieCard: React.FC<MovieCardProps> = ({ ...movie }) => {
  return (
    <div
      id={movie.id}
      className="bg-white flex w-48 flex-col items-start rounded-lg shadow-lg hover:bg-gray-50 sm:w-56 md:w-64 lg:w-72 xl:w-80"
    >
      {/* <h3 className="text-[12px] sm:text-sm md:text-base lg:text-xl font-bold">{movie.title}</h3> */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="h-full w-full rounded-t-lg object-cover"
      />

      <p
        className="mt-2 line-clamp-3 text-sm text-gray-600 transition-all duration-300 ease-in-out group-hover:line-clamp-none md:text-base"
        title={movie.overview}
      >
        {movie.overview}
      </p>
    </div>
  );
};
