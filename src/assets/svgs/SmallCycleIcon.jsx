import React from 'react';
import {Rect, Svg} from 'react-native-svg';

function SmallCycleIcon({style}) {
  return (
    <Svg
      style={style}
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="0.5" width="9" height="9" rx="4.5" fill="#D9D9D9" />
    </Svg>
  );
}

export default SmallCycleIcon;
