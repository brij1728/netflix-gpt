import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  breakpoints?: Record<
    number,
    { slidesPerView: number; spaceBetween?: number }
  >;
  navigation?: boolean;
  pagination?: boolean;
}

export const Carousel = <T,>({
  items,
  renderItem,
  slidesPerView = 1,
  spaceBetween = 10,
  breakpoints,
  navigation = true,
  pagination = true,
}: CarouselProps<T>) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      breakpoints={breakpoints}
      className="w-full"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
      ))}
    </Swiper>
  );
};
