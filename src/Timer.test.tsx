import { act } from 'react';
import { render } from '@testing-library/react';
import { Timer } from './Timer';
import {
  useBackgroundStore,
  defaultBackgroundColor,
  alertColor,
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

describe('Timer', () => {
  test('starts at the full deadline and counts down', () => {
    render(<Timer deadlineMinutes={1} />);

    expect(minutesShown()).toBe('01');
    expect(secondsShown()).toBe('00');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('59');
    expect(useBackgroundStore.getState().backgroundColor).toBe(warningColor);
  });

  test('clamps at zero and triggers the alert color when the deadline passes', () => {
    render(<Timer deadlineMinutes={1} />);

    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('00');
    expect(useBackgroundStore.getState().backgroundColor).toBe(alertColor);
  });

  test('counts down multi minute deadlines', () => {
    render(<Timer deadlineMinutes={2} />);

    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(minutesShown()).toBe('01');
    expect(secondsShown()).toBe('00');
    expect(useBackgroundStore.getState().backgroundColor).toBe(defaultBackgroundColor);
  });

  test('pause freezes the countdown and resume shifts the deadline forward', () => {
    const { rerender } = render(<Timer deadlineMinutes={1} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('58');

    rerender(<Timer deadlineMinutes={1} paused />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('58');

    rerender(<Timer deadlineMinutes={1} paused={false} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('57');
  });

  test('pausing at zero keeps the display at zero after resume', () => {
    const { rerender } = render(<Timer deadlineMinutes={1} />);

    act(() => {
      vi.advanceTimersByTime(61000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('00');

    rerender(<Timer deadlineMinutes={1} paused />);
    rerender(<Timer deadlineMinutes={1} paused={false} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(minutesShown()).toBe('00');
    expect(secondsShown()).toBe('00');
  });
});