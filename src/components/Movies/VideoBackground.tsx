interface VideoBackgroundProps {
  trailerKey: string;
  title?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  trailerKey,
  title,
}) => {
  return (
    <div className="">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&cc_load_policy=0`}
        title={title}
        className="aspect-video h-full w-full rounded-lg"
      ></iframe>
    </div>
  );
};
