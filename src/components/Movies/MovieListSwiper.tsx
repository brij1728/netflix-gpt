import { Carousel } from '../ui/Carousel';
import { Movie } from '../../types/movies';
import { MovieCard } from './MovieCard';

interface MovieListSwiperProps {
  title: string;
  movies: Movie[] | null;
}

export const MovieListSwiper: React.FC<MovieListSwiperProps> = ({
  title,
  movies,
}) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 pb-2 sm:gap-2 sm:pb-3 md:pb-4">
      {/* Section Title */}
      <p className="pl-2 text-sm font-medium text-white-100 sm:text-base md:pl-4 md:text-xl lg:text-2xl xl:text-3xl">
        {title}
      </p>

      {/* Carousel Component */}
      <Carousel
        items={movies}
        renderItem={(movie) => <MovieCard {...movie} />}
        slidesPerView={3}
        spaceBetween={15}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
        pagination={false}
      />
    </div>
  );
};
