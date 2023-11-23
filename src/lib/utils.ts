import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function throttle(fn: () => unknown, delay = 400) {
  let run = true;

  return (...args: unknown[]) => {

    if (run) {
      fn.call(args);
      run = false;

      setTimeout(() => {
        run = true;
      }, delay);
    }
  }
}