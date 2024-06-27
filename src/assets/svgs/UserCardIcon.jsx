import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function UserCardIcon() {
  return (
    <Svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_118_1522"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="19">
        <Rect y="0.5" width="18" height="18" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_118_1522)">
        <Path
          d="M16.5 5V14C16.5 14.4125 16.3531 14.7656 16.0594 15.0594C15.7656 15.3531 15.4125 15.5 15 15.5H3C2.5875 15.5 2.23438 15.3531 1.94063 15.0594C1.64688 14.7656 1.5 14.4125 1.5 14V5C1.5 4.5875 1.64688 4.23438 1.94063 3.94063C2.23438 3.64688 2.5875 3.5 3 3.5H15C15.4125 3.5 15.7656 3.64688 16.0594 3.94063C16.3531 4.23438 16.5 4.5875 16.5 5ZM3 6.5H15V5H3V6.5ZM3 9.5V14H15V9.5H3Z"
          fill="#0B1596"
        />
      </G>
    </Svg>
  );
}

export default UserCardIcon;
