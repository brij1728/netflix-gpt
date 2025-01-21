import { Movie } from '../../types/movies';

export const MovieCard: React.FC<Movie> = ({ ...movie }) => {
  return (
    <div
      id={movie.id}
      className="bg-white group flex flex-col items-start rounded-lg p-4 shadow-lg transition hover:bg-gray-50"
    >
      <h3 className="mt-2 text-xl font-bold">{movie.title}</h3>
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
