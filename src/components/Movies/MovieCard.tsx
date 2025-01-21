import { Movie } from '../../types/movies';

export const MovieCard: React.FC<Movie> = ({ ...movie }) => {
  return (
    <div id={movie.id}>
      <img src={movie.poster_path} alt={movie.title} />
      <h3 className="font-bold">{movie.title}</h3>
      <p>{movie.overview}</p>
    </div>
  );
};
