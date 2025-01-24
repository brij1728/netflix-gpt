interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div
      className={`fixed inset-0 z-50 flex aspect-video items-center justify-center bg-black bg-opacity-50 ${className}`}
    >
      <div className="bg-white relative w-11/12 max-w-lg rounded-lg p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-black"
        >
          &#x2715;
        </button>

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};
