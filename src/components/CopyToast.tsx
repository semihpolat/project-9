import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

interface CopyToastProps {
  show: boolean;
  onClose: () => void;
}

const CopyToast: React.FC<CopyToastProps> = ({ show, onClose }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <Transition
        show={show}
        as={Fragment}
        enter="transition-all duration-150"
        enterFrom="opacity-0 translate-y-4 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-4 scale-95"
        afterEnter={() => {
          setTimeout(() => {
            onClose();
          }, 2000);
        }}
      >
        <div className="bg-cartier-black text-cartier-ivory px-6 py-3 border border-cartier-red/20 shadow-lg">
          <div className="flex items-center space-x-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-cartier-red"
            >
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            <span className="font-serif text-sm uppercase tracking-wider">
              Copied ✓
            </span>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default CopyToast; 