import { GESTURES } from '../constants';

export const validateGestures = (gestures) => {
  const validGestures = [
    GESTURES.ClosedFist,
    GESTURES.OpenPalm,
    GESTURES.PointingUp,
    GESTURES.PointingUp,
    GESTURES.ThumbUp,
    GESTURES.ILoveU
  ];

  return validGestures.includes(gestures);
};
