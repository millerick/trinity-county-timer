import { useSyncExternalStore } from 'react';

export const defaultBackgroundColor = 'rgba(255, 255, 255, 0.8)';
export const alertColor = 'rgba(255, 113, 113, 0.9)';
export const warningColor = 'rgba(255, 255, 113, 0.9)';

interface BackgroundState {
  backgroundColor: string;
  changeColor: (newColor: string) => void;
}

type Listener = () => void;

const listeners = new Set<Listener>();

let state: BackgroundState = {
  backgroundColor: defaultBackgroundColor,
  changeColor: (newColor: string) => setState({ backgroundColor: newColor }),
};

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setState(partial: Partial<BackgroundState>) {
  state = { ...state, ...partial };
  for (const listener of [...listeners]) {
    listener();
  }
}

function useBackgroundStoreHook<T>(selector: (s: BackgroundState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}

const useBackgroundStore = Object.assign(useBackgroundStoreHook, {
  getState: () => state,
  setState,
});

export { useBackgroundStore };