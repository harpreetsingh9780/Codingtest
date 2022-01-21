import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 647;

export const scaleHorizontally = size =>
  (DEVICE_WIDTH / guidelineBaseWidth) * size;
export const scaleVerticaly = size =>
  (DEVICE_HEIGHT / guidelineBaseHeight) * size;
