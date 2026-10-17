import {
  useBackgroundStore,
  defaultBackgroundColor,
  alertColor,
  warningColor,
} from './backgroundColorChanger';

beforeEach(() => {
  useBackgroundStore.setState({ backgroundColor: defaultBackgroundColor });
});

describe('backgroundColorChanger', () => {
  test('exposes the exported color constants', () => {
    expect(defaultBackgroundColor).toBe('rgba(255, 255, 255, 0.8)');
    expect(alertColor).toBe('rgba(255, 113, 113, 0.9)');
    expect(warningColor).toBe('rgba(255, 255, 113, 0.9)');
  });

  test('store starts with the default background color', () => {
    expect(useBackgroundStore.getState().backgroundColor).toBe(defaultBackgroundColor);
  });

  test('changeColor updates the background color', () => {
    const { changeColor } = useBackgroundStore.getState();

    changeColor(warningColor);
    expect(useBackgroundStore.getState().backgroundColor).toBe(warningColor);

    changeColor(alertColor);
    expect(useBackgroundStore.getState().backgroundColor).toBe(alertColor);

    changeColor(defaultBackgroundColor);
    expect(useBackgroundStore.getState().backgroundColor).toBe(defaultBackgroundColor);
  });
});