import { Insets } from 'react-native';

export const getHitSlop = (
  params: Insets & { value?: number } = {
    value: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
): Insets | undefined => {
  const { value, top, left, right, bottom } = params;

  return {
    top: top || value,
    left: left || value,
    right: right || value,
    bottom: bottom || value,
  };
};

export default { getHitSlop };
