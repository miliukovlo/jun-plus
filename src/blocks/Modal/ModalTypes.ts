import { ReactNode } from 'react';

export interface IModalProps {
  showModal: boolean;
  onClose: () => void;
  children?: ReactNode;
}
