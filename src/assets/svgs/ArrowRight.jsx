import React from 'react';
import {Path, Svg} from 'react-native-svg';

function ArrowRight({style, fill}) {
  return (
    <Svg
      style={style}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 2L18 12L8 22L6.225 20.225L14.45 12L6.225 3.775L8 2Z"
        fill={fill || '#9B9B9B'}
      />
    </Svg>
  );
}

export default ArrowRight;
