import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function PayedIcon({style}) {
  return (
    <Svg
      style={style}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_13_469"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16">
        <Rect width="16" height="16" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_13_469)">
        <Path
          d="M5.1436 10C4.64442 10 4.29777 9.77808 4.10364 9.33424C3.90952 8.8904 3.98809 8.49638 4.33937 8.15217L7.2235 5.32609C7.33443 5.21739 7.4546 5.13587 7.58402 5.08152C7.71344 5.02717 7.8521 5 8 5C8.1479 5 8.28656 5.02717 8.41598 5.08152C8.5454 5.13587 8.66557 5.21739 8.7765 5.32609L11.6606 8.15217C12.0119 8.49638 12.0905 8.8904 11.8964 9.33424C11.7022 9.77808 11.3556 10 10.8564 10H5.1436Z"
          fill="#E52929"
        />
      </G>
    </Svg>
  );
}

export default PayedIcon;
