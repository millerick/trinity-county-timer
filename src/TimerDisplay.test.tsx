import { render, screen } from '@testing-library/react';
import { TimerDisplay } from './TimerDisplay';
import {
  useBackgroundStore,
  defaultBackgroundColor,
  alertColor,
  warningColor,
} from './backgroundColorChanger';

beforeEach(() => {
  useBackgroundStore.setState({ backgroundColor: defaultBackgroundColor });
});

function minutesShown() {
  return document.getElementById('minute')?.textContent;
}

function secondsShown() {
  return document.getElementById('second')?.textContent;
}

describe('TimerDisplay', () => {
  test('renders a timer element with the given minutes and seconds', () => {
    render(<TimerDisplay minutes={3} seconds={45} modulo={0} />);

    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(minutesShown()).toBe('03');
    expect(secondsShown()).toBe('45');
  });

  test('zero-pads single digit minutes and seconds', () => {
    render(<TimerDisplay minutes={5} seconds={7} modulo={1} />);

    expect(minutesShown()).toBe('05');
    expect(secondsShown()).toBe('07');
  });

  test('shows double digit minutes and seconds as-is', () => {
    render(<TimerDisplay minutes={12} seconds={34} modulo={0} />);

    expect(minutesShown()).toBe('12');
    expect(secondsShown()).toBe('34');
  });

  test('switches to the warning color during the last minute', () => {
    render(<TimerDisplay minutes={0} seconds={30} modulo={1} />);

    expect(useBackgroundStore.getState().backgroundColor).toBe(warningColor);
  });

  test('switches to the alert color at exactly zero', () => {
    render(<TimerDisplay minutes={0} seconds={0} modulo={0} />);

    expect(useBackgroundStore.getState().backgroundColor).toBe(alertColor);
  });

  test('treats zero time with odd modulo as warning, not alert', () => {
    render(<TimerDisplay minutes={0} seconds={0} modulo={1} />);

    expect(useBackgroundStore.getState().backgroundColor).toBe(warningColor);
  });

  test('does not change the color while time remains', () => {
    render(<TimerDisplay minutes={1} seconds={30} modulo={0} />);

    expect(useBackgroundStore.getState().backgroundColor).toBe(defaultBackgroundColor);
  });
});