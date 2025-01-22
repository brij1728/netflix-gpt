import { Button } from '../ui';
import { FaPlay } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Movie } from '../../types/movies';

export const VideoTitle: React.FC<Movie> = ({ ...movie }) => {
  //   const [showVideo, setShowVideo] = useState(false);
  //   const handlePlayClick = () => {
  //     setShowVideo(true); // Load and display video when the Play button is clicked
  //   };
  return (
    <div
      id={movie.id}
      className="absolute flex aspect-video w-1/2 flex-col items-start rounded-lg p-4 px-12 pt-36 text-white-100"
    >
      <h2 className="mt-2 text-3xl font-bold">{movie.title}</h2>
      {/* <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="h-full w-full rounded-t-lg object-cover"
      /> */}

      <p className="py-6 text-base md:text-lg">{movie.overview}</p>
      <div className="mt-2 flex justify-between gap-2 md:gap-4">
        <Button className="bg-white-100 text-netflix-black hover:bg-opacity-80">
          <div className="flex items-center justify-center gap-2">
            <FaPlay />
            Play
          </div>
        </Button>

        <Button className="bg-gray-500 text-white-100 hover:bg-gray-700">
          <div className="flex items-center justify-center gap-2">
            <IoIosInformationCircleOutline size={25} /> More Info
          </div>
        </Button>
      </div>
    </div>
  );
};
