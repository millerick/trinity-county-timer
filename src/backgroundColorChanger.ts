import { create } from 'zustand';

export const defaultBackgroundColor = 'rgba(255, 255, 255, 0.8)';
export const alertColor = 'rgba(255, 113, 113, 0.9)';
export const warningColor = 'rgba(255, 255, 113, 0.9)';

export const useBackgroundStore = create((set) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  changeColor: (newColor: string) => set((state: any) => ({ backgroundColor: newColor })),
}));
