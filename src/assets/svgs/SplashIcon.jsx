import React from 'react';
import {Circle, Svg} from 'react-native-svg';

function SplashIcon({fill}) {
  return (
    <Svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="3" cy="3" r="3" fill={fill} />
    </Svg>
  );
}

export default SplashIcon;
