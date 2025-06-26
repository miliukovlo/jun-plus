export interface IButtonProps {
  text: string;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
}
