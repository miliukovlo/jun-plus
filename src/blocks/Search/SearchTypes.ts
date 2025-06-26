import { Dispatch, SetStateAction } from 'react';

export interface ISearchProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
