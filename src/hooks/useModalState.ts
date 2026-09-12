import { useState, useRef, useCallback, useEffect } from 'react';

interface UseModalOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export function useModal(options: UseModalOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    modalRef.current?.showModal();
    options.onOpen?.();
  }, [options]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    modalRef.current?.close();
    options.onClose?.();
  }, [options]);

  const toggleModal = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, openModal, closeModal]);

  // Handle backdrop click to close
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === modal) {
        closeModal();
      }
    };

    modal.addEventListener('click', handleClickOutside);
    return () => modal.removeEventListener('click', handleClickOutside);
  }, [closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    modalRef,
  };
}