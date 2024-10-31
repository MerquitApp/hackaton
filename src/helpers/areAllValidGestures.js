import { validGestures } from '../constants';

export const areAllValidGestures = (gestures) => {
  return (
    validGestures.length === gestures.length &&
    gestures.every((gesture, idx) => validGestures[idx] === gesture)
  );
};
