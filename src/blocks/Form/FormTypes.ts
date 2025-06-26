import { IError } from '@/types';

export interface IFormProps {
  onModalClose: () => void;
}

export interface IFormState {
  title: string;
  description: string;
  hours: number;
  minutes: number;
}

export type IFormErrors = {
  titleError: IError | null;
  descriptionError: IError | null;
  minuteError: IError | null;
};
