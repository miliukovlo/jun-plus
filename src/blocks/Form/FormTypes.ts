export interface IFormProps {
  onModalClose: () => void;
}

export interface IFormState {
  title: string;
  description: string;
  hours: number;
  minutes: number;
}
