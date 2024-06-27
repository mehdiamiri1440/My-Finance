import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function NegetiveIcon() {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_196_1246"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16">
        <Rect width="16" height="16" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_196_1246)">
        <Path
          d="M5.33366 8.66683C5.14477 8.66683 4.98644 8.60294 4.85866 8.47516C4.73088 8.34739 4.66699 8.18905 4.66699 8.00016C4.66699 7.81127 4.73088 7.65294 4.85866 7.52516C4.98644 7.39738 5.14477 7.3335 5.33366 7.3335H10.667C10.8559 7.3335 11.0142 7.39738 11.142 7.52516C11.2698 7.65294 11.3337 7.81127 11.3337 8.00016C11.3337 8.18905 11.2698 8.34739 11.142 8.47516C11.0142 8.60294 10.8559 8.66683 10.667 8.66683H5.33366Z"
          fill="#E52929"
        />
      </G>
    </Svg>
  );
}

export default NegetiveIcon;
