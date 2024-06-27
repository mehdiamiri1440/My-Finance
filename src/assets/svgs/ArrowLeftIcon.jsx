import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function ArrowLeftIcon({onPress, style}) {
  return (
    <Svg
      style={style}
      onPress={onPress}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_118_1760"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="28">
        <Rect width="28" height="28" fill="#fff" />
      </Mask>
      <G mask="url(#mask0_118_1760)">
        <Path
          d="M12.6878 22.5168L4.98783 14.8168C4.87116 14.7001 4.78852 14.5737 4.73991 14.4376C4.6913 14.3015 4.66699 14.1557 4.66699 14.0001C4.66699 13.8446 4.6913 13.6987 4.73991 13.5626C4.78852 13.4265 4.87116 13.3001 4.98783 13.1835L12.6878 5.48346C12.9017 5.26957 13.1691 5.15777 13.4899 5.14804C13.8107 5.13832 14.0878 5.25013 14.3212 5.48346C14.5545 5.69735 14.676 5.96471 14.6857 6.28554C14.6955 6.60638 14.5837 6.88346 14.3503 7.11679L8.63366 12.8335H21.6712C22.0017 12.8335 22.2788 12.9453 22.5024 13.1689C22.726 13.3925 22.8378 13.6696 22.8378 14.0001C22.8378 14.3307 22.726 14.6078 22.5024 14.8314C22.2788 15.055 22.0017 15.1668 21.6712 15.1668H8.63366L14.3503 20.8835C14.5642 21.0974 14.676 21.3696 14.6857 21.7001C14.6955 22.0307 14.5837 22.3029 14.3503 22.5168C14.1364 22.7501 13.8642 22.8668 13.5337 22.8668C13.2031 22.8668 12.9212 22.7501 12.6878 22.5168Z"
          fill="white"
        />
      </G>
    </Svg>
  );
}

export default ArrowLeftIcon;
