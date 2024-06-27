import React from 'react';
import {Path, Svg} from 'react-native-svg';

function ArrowLeft({style}) {
  return (
    <Svg
      style={style}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z"
        fill="#6E80CA"
      />
    </Svg>
  );
}

export default ArrowLeft;
