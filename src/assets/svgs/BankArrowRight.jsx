import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function BankArrowRight({style, onPress, fill}) {
  return (
    <Svg
      style={style}
      onPress={onPress}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_160_1096"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="18">
        <Rect width="18" height="18" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_160_1096)">
        <Path
          d="M5.3623 15.825C5.1748 15.6375 5.08105 15.4156 5.08105 15.1594C5.08105 14.9031 5.1748 14.6813 5.3623 14.4938L10.8561 9L5.34355 3.4875C5.16855 3.3125 5.08105 3.09375 5.08105 2.83125C5.08105 2.56875 5.1748 2.34375 5.3623 2.15625C5.5498 1.96875 5.77168 1.875 6.02793 1.875C6.28418 1.875 6.50605 1.96875 6.69355 2.15625L12.9936 8.475C13.0686 8.55 13.1217 8.63125 13.1529 8.71875C13.1842 8.80625 13.1998 8.9 13.1998 9C13.1998 9.1 13.1842 9.19375 13.1529 9.28125C13.1217 9.36875 13.0686 9.45 12.9936 9.525L6.6748 15.8438C6.4998 16.0188 6.28418 16.1063 6.02793 16.1063C5.77168 16.1063 5.5498 16.0125 5.3623 15.825Z"
          fill={fill || '#9B9B9B'}
        />
      </G>
    </Svg>
  );
}

export default BankArrowRight;
