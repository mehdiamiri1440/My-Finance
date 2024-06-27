import React from 'react';
import {Circle, G, Mask, Path, Rect, Svg} from 'react-native-svg';

function RecivedIcon({style}) {
  return (
    <Svg
      style={style}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_13_473"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16">
        <Rect width="16" height="16" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_13_473)">
        <Path
          d="M7.2235 10.6739L4.33937 7.84783C3.98809 7.50362 3.90952 7.1096 4.10364 6.66576C4.29777 6.22192 4.64442 6 5.1436 6H10.8564C11.3556 6 11.7022 6.22192 11.8964 6.66576C12.0905 7.1096 12.0119 7.50362 11.6606 7.84783L8.7765 10.6739C8.66557 10.7826 8.5454 10.8641 8.41598 10.9185C8.28657 10.9728 8.1479 11 8 11C7.8521 11 7.71344 10.9728 7.58402 10.9185C7.4546 10.8641 7.33443 10.7826 7.2235 10.6739Z"
          fill="#00CF82"
        />
      </G>
    </Svg>
  );
}

export default RecivedIcon;
