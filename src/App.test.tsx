import { render } from '@testing-library/react';
import App from './App';
import { useBackgroundStore, defaultBackgroundColor } from './backgroundColorChanger';

function appElement() {
  return document.querySelector('.app') as HTMLElement;
}

function minutesShown() {
  return document.getElementById('minute')?.textContent;
}

function secondsShown() {
  return document.getElementById('second')?.textContent;
}

beforeEach(() => {
  useBackgroundStore.setState({ backgroundColor: defaultBackgroundColor });
  window.history.pushState({}, '', window.location.pathname);
});

describe('App', () => {
  test('defaults to 3 minutes when no minutes param is given', () => {
    render(<App />);

    expect(minutesShown()).toBe('03');
    expect(secondsShown()).toBe('00');
  });

  test('reads the timer length from the ?minutes query param', () => {
    window.history.pushState({}, '', '?minutes=7');

    render(<App />);

    expect(minutesShown()).toBe('07');
    expect(secondsShown()).toBe('00');
  });

  test('ignores an empty minutes param and falls back to the default', () => {
    window.history.pushState({}, '', '?minutes=');

    render(<App />);

    expect(minutesShown()).toBe('03');
  });

  test('falls back to the default when minutes param is not a number', () => {
    window.history.pushState({}, '', '?minutes=abc');

    render(<App />);

    expect(minutesShown()).toBe('03');
  });

  test('sets a background image from the day of the year', () => {
    window.history.pushState({}, '', '?minutes=10');

    const { container } = render(<App />);

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const padded = String(dayOfYear % 5).padStart(2, '0');

    expect(appElement().style.backgroundImage).toContain(`${padded}.jpg`);
  });

  test('renders the timer controls', () => {
    const { container } = render(<App />);

    expect(container.querySelector('.timer-control-box')).not.toBeNull();
    expect(appElement()).toBeInTheDocument();
  });
});