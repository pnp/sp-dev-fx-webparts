import { useState } from 'react';

interface UseModalReturnType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModalReturnType => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;