import React from 'react';
import {Rect, Svg} from 'react-native-svg';

function LargeCycleIcon({style}) {
  return (
    <Svg
      style={style}
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="0.5" width="15" height="15" rx="7.5" fill="#0B1596" />
    </Svg>
  );
}

export default LargeCycleIcon;
