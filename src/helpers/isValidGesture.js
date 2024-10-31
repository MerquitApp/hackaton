import { validGestures } from '../constants';

export const isValidGesture = (gesture, idx) => {
  return validGestures[idx] === gesture;
};
