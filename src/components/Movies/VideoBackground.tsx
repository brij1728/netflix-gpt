interface VideoBackgroundProps {
  trailerKey: string;
  title?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  trailerKey,
  title,
}) => {
  return (
    <div className="video-background">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full rounded-lg"
      ></iframe>
    </div>
  );
};
