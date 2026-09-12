export interface ModalOption {
  label: string;
  value: string;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DaisyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  options: ModalOption[];
  onSelect: (value: string) => void;
  trigger?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top' | 'center' | 'bottom';
  backdrop?: boolean;
  className?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

export interface UseDaisyModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  modalRef: React.RefObject<HTMLDialogElement>;
  setModalData: (data: any) => void;
  modalData: any;
}

export interface ModalTriggerProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}