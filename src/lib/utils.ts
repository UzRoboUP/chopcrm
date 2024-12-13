import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createBrowserHistory } from 'history';
  
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const history = createBrowserHistory();
