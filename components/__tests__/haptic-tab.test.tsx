import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { HapticTab } from '../haptic-tab';

jest.mock('expo-haptics');

describe('HapticTab Component', () => {
  const mockProps = {
    to: '/home',
    onPress: jest.fn(),
    onPressIn: jest.fn(),
    testID: 'haptic-tab',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { getByTestId } = render(<HapticTab {...mockProps} />);
      expect(getByTestId('haptic-tab')).toBeTruthy();
    });

    it('should render with children', () => {
      const { getByText } = render(
        <HapticTab {...mockProps}>
          <></>Tab Label
        </HapticTab>
      );
      expect(getByText('Tab Label')).toBeTruthy();
    });
  });

  describe('iOS Haptic Feedback', () => {
    it('should trigger haptic feedback on iOS', () => {
      process.env.EXPO_OS = 'ios';

      const { getByTestId } = render(<HapticTab {...mockProps} />);
      const tab = getByTestId('haptic-tab');

      fireEvent(tab, 'pressIn');

      expect(Haptics.impactAsync).toHaveBeenCalledWith(
        Haptics.ImpactFeedbackStyle.Light
      );
    });

    it('should call onPressIn callback on iOS', () => {
      process.env.EXPO_OS = 'ios';

      const onPressIn = jest.fn();
      const { getByTestId } = render(
        <HapticTab {...mockProps} onPressIn={onPressIn} />
      );

      const tab = getByTestId('haptic-tab');
      fireEvent(tab, 'pressIn');

      expect(onPressIn).toHaveBeenCalled();
    });

    it('should trigger haptic before onPressIn callback on iOS', () => {
      process.env.EXPO_OS = 'ios';

      const callOrder: string[] = [];
      const onPressIn = jest.fn(() => callOrder.push('onPressIn'));
      (Haptics.impactAsync as jest.Mock).mockImplementation(() =>
        callOrder.push('haptic')
      );

      const { getByTestId } = render(
        <HapticTab {...mockProps} onPressIn={onPressIn} />
      );

      fireEvent(getByTestId('haptic-tab'), 'pressIn');

      expect(callOrder).toEqual(['haptic', 'onPressIn']);
    });
  });

  describe('Android Behavior', () => {
    it('should not trigger haptic feedback on Android', () => {
      process.env.EXPO_OS = 'android';

      const { getByTestId } = render(<HapticTab {...mockProps} />);
      fireEvent(getByTestId('haptic-tab'), 'pressIn');

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });

    it('should call onPressIn callback on Android', () => {
      process.env.EXPO_OS = 'android';

      const onPressIn = jest.fn();
      const { getByTestId } = render(
        <HapticTab {...mockProps} onPressIn={onPressIn} />
      );

      fireEvent(getByTestId('haptic-tab'), 'pressIn');

      expect(onPressIn).toHaveBeenCalled();
      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  describe('Web Behavior', () => {
    it('should not trigger haptic feedback on web', () => {
      process.env.EXPO_OS = 'web';

      const { getByTestId } = render(<HapticTab {...mockProps} />);
      fireEvent(getByTestId('haptic-tab'), 'pressIn');

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  describe('Props Handling', () => {
    it('should pass through all props', () => {
      const customProps = {
        ...mockProps,
        accessibilityLabel: 'Custom Tab',
        accessible: true,
      };

      const { getByTestId } = render(<HapticTab {...customProps} />);
      expect(getByTestId('haptic-tab')).toBeTruthy();
    });

    it('should work without onPressIn prop', () => {
      process.env.EXPO_OS = 'ios';
      const propsWithoutOnPressIn = { ...mockProps };
      delete propsWithoutOnPressIn.onPressIn;

      const { getByTestId } = render(
        <HapticTab {...propsWithoutOnPressIn} />
      );

      expect(() => {
        fireEvent(getByTestId('haptic-tab'), 'pressIn');
      }).not.toThrow();

      expect(Haptics.impactAsync).toHaveBeenCalled();
    });
  });

  describe('Multiple Interactions', () => {
    it('should trigger haptic on multiple presses on iOS', () => {
      process.env.EXPO_OS = 'ios';

      const { getByTestId } = render(<HapticTab {...mockProps} />);
      const tab = getByTestId('haptic-tab');

      fireEvent(tab, 'pressIn');
      fireEvent(tab, 'pressIn');
      fireEvent(tab, 'pressIn');

      expect(Haptics.impactAsync).toHaveBeenCalledTimes(3);
    });

    it('should call onPressIn multiple times', () => {
      const onPressIn = jest.fn();
      const { getByTestId } = render(
        <HapticTab {...mockProps} onPressIn={onPressIn} />
      );

      const tab = getByTestId('haptic-tab');
      fireEvent(tab, 'pressIn');
      fireEvent(tab, 'pressIn');

      expect(onPressIn).toHaveBeenCalledTimes(2);
    });
  });
});
