import { Button } from '../ui';
import { FaPlay } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Movie } from '../../types/movies';
import { OverviewModal } from './OverviewModal';
import { useState } from 'react';

export const VideoTitle: React.FC<Movie> = ({ ...movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div
        id={movie.id}
        className="absolute flex aspect-video w-[60%] flex-col items-start rounded-lg p-2 px-12 pt-24 text-white-100 md:w-1/2 md:p-4 md:pt-48 xl:pt-72"
      >
        <h2 className="mt-2 text-xl font-bold md:text-3xl">{movie.title}</h2>

        {/* Truncated Overview */}
        <p className="line-clamp-3 overflow-hidden text-sm transition-all md:text-lg">
          {movie.overview || 'Overview not available.'}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between gap-2 md:gap-4">
          <Button className="bg-white-100 px-1 py-[2px] text-[12px] text-netflix-black hover:bg-opacity-80 sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base lg:text-xl">
            <div className="flex items-center justify-center gap-2">
              <FaPlay />
              Play
            </div>
          </Button>

          <Button
            onClick={handleModalToggle}
            className="bg-gray-500 px-1 py-[2px] text-white-100 hover:bg-gray-700 sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base lg:text-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <IoIosInformationCircleOutline size={25} /> More Info
            </div>
          </Button>
        </div>
      </div>

      {/* Overview Modal */}
      <div className="">
        <OverviewModal
          title={movie.title}
          overview={movie.overview}
          isOpen={isModalOpen}
          onClose={handleModalToggle}
        />
      </div>
    </>
  );
};
