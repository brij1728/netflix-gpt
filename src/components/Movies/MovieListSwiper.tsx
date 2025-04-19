import { Carousel } from '../ui/Carousel';
import { Movie } from '../../types/movies';
import { MovieCard } from './MovieCard';

interface MovieListSwiperProps {
  title?: string;
  movies: Movie[] | null;
}

export const MovieListSwiper: React.FC<MovieListSwiperProps> = ({
  title,
  movies,
}) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  //Filter out movies with no poster_path
  const moviesWithPosters = movies.filter((movie) => !!movie.poster_path);

  return (
    <div className="flex flex-col gap-1 pb-2 sm:gap-2 sm:pb-3 md:pb-4">
      {/* Section Title */}
      <p className="pl-2 text-sm font-medium text-white-100 sm:text-base md:pl-4 md:text-xl lg:text-2xl xl:text-3xl">
        {title}
      </p>

      {/* Carousel Component */}
      <Carousel
        items={moviesWithPosters}
        renderItem={(movie) => <MovieCard {...movie} />}
        slidesPerView={2}
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 1 },
          400: { slidesPerView: 4, spaceBetween: 1 },
          520: { slidesPerView: 5, spaceBetween: 1 },
          640: { slidesPerView: 5, spaceBetween: 1 },
          768: { slidesPerView: 5, spaceBetween: 2 },
          900: { slidesPerView: 6, spaceBetween: 3 },

          1024: { slidesPerView: 5, spaceBetween: 4 },
          1280: { slidesPerView: 5, spaceBetween: 8 },
        }}
        pagination={false}
      />
    </div>
  );
};
