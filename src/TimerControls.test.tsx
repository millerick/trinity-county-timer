import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimerControls } from './TimerControls';
import {
  useBackgroundStore,
  defaultBackgroundColor,
  warningColor,
} from './backgroundColorChanger';

function minutesShown() {
  return document.getElementById('minute')?.textContent;
}

function secondsShown() {
  return document.getElementById('second')?.textContent;
}

beforeEach(() => {
  vi.useFakeTimers();
  useBackgroundStore.setState({ backgroundColor: defaultBackgroundColor });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('TimerControls', () => {
  test('shows a static display with both buttons enabled before starting', () => {
    render(<TimerControls timerStart={5} />);

    expect(screen.getByRole('button', { name: 'Start' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reset' })).not.toBeDisabled();
    expect(minutesShown()).toBe('05');
    expect(secondsShown()).toBe('00');
  });

  test('reset before starting keeps the default color and enabled buttons', () => {
    render(<TimerControls timerStart={5} />);

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByRole('button', { name: 'Start' })).not.toBeDisabled();
    expect(minutesShown()).toBe('05');
    expect(secondsShown()).toBe('00');
    expect(useBackgroundStore.getState().backgroundColor).toBe(defaultBackgroundColor);
  });

  test('start disables the Start button and begins the countdown', () => {
    render(<TimerControls timerStart={1} />);

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('59');
    expect(useBackgroundStore.getState().backgroundColor).toBe(warningColor);
  });

  test('reset stops the countdown, restores the initial time and default color', () => {
    render(<TimerControls timerStart={1} />);

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(useBackgroundStore.getState().backgroundColor).toBe(warningColor);

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByRole('button', { name: 'Start' })).not.toBeDisabled();
    expect(minutesShown()).toBe('01');
    expect(secondsShown()).toBe('00');
    expect(useBackgroundStore.getState().backgroundColor).toBe(defaultBackgroundColor);
  });
});