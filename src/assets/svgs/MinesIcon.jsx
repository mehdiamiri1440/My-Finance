import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function MinesIcon() {
  return (
    <Svg
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_21_1142"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="27"
        height="26">
        <Rect x="0.5" width="26" height="26" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_21_1142)">
        <Path
          d="M9.16634 14.0833C8.8594 14.0833 8.6021 13.9795 8.39447 13.7719C8.18683 13.5642 8.08301 13.3069 8.08301 13C8.08301 12.6931 8.18683 12.4358 8.39447 12.2281C8.6021 12.0205 8.8594 11.9167 9.16634 11.9167H17.833C18.14 11.9167 18.3972 12.0205 18.6049 12.2281C18.8125 12.4358 18.9163 12.6931 18.9163 13C18.9163 13.3069 18.8125 13.5642 18.6049 13.7719C18.3972 13.9795 18.14 14.0833 17.833 14.0833H9.16634Z"
          fill="#0B1596"
        />
      </G>
    </Svg>
  );
}

export default MinesIcon;
