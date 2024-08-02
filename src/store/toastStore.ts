import { create } from 'zustand';

export type TToastType = 'info' | 'error';

export interface IToast {
  id: number;
  type: TToastType;
  message: string;
}

interface IToastStoreState {
  toasts: IToast[];
  addToast: (message: string, type?: TToastType) => void;
  removeToast: (id: number) => void;
}

const useToastStore = create<IToastStoreState>((set) => ({
  toasts: [],
  addToast: (message, type = 'info') => {
    set((state) => {
      return {
        toasts: [...state.toasts, { message, type, id: Date.now() }],
      };
    });
  },
  removeToast: (id) => {
    set((state) => {
      return {
        toasts: state.toasts.filter((toast) => toast.id !== id),
      };
    });
  },
}));

export default useToastStore;
