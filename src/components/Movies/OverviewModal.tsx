import { Modal } from '../ui';

interface OverviewModalProps {
  title: string;
  overview?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OverviewModal: React.FC<OverviewModalProps> = ({
  title,
  overview,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="aspect-video h-full w-full bg-netflix-black bg-opacity-90 text-white-100"
    >
      <h3 className="text-xl font-bold md:text-3xl">{title}</h3>
      <p className="mt-4 text-sm sm:text-base md:text-xl">
        {overview || 'No overview available.'}
      </p>
    </Modal>
  );
};
