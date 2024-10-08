import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function SaveNoteIcon() {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_338_2053"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="18">
        <Rect width="18" height="18" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_338_2053)">
        <Path
          d="M3.75 14.25H14.25V7.36875L10.6313 3.75H3.75V14.25ZM3.75 15.75C3.3375 15.75 2.98438 15.6031 2.69063 15.3094C2.39688 15.0156 2.25 14.6625 2.25 14.25V3.75C2.25 3.3375 2.39688 2.98438 2.69063 2.69063C2.98438 2.39688 3.3375 2.25 3.75 2.25H11.25L15.75 6.75V14.25C15.75 14.6625 15.6031 15.0156 15.3094 15.3094C15.0156 15.6031 14.6625 15.75 14.25 15.75H3.75ZM5.25 12.75H12.75V11.25H5.25V12.75ZM5.25 9.75H12.75V8.25H5.25V9.75ZM5.25 6.75H10.5V5.25H5.25V6.75Z"
          fill="#9B9B9B"
        />
      </G>
    </Svg>
  );
}

export default SaveNoteIcon;
