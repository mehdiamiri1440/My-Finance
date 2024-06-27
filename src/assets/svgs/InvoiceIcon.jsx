import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

function InvoiceIcon({color}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_758_636)">
        <Path
          d="M9.16667 5.83333H14.1667V7.5H9.16667V5.83333ZM9.16667 9.16667H14.1667V10.8333H9.16667V9.16667ZM9.16667 12.5H14.1667V14.1667H9.16667V12.5ZM5.83333 5.83333H7.5V7.5H5.83333V5.83333ZM5.83333 9.16667H7.5V10.8333H5.83333V9.16667ZM5.83333 12.5H7.5V14.1667H5.83333V12.5ZM16.75 2.5H3.25C2.83333 2.5 2.5 2.83333 2.5 3.25V16.75C2.5 17.0833 2.83333 17.5 3.25 17.5H16.75C17.0833 17.5 17.5 17.0833 17.5 16.75V3.25C17.5 2.83333 17.0833 2.5 16.75 2.5V2.5ZM15.8333 15.8333H4.16667V4.16667H15.8333V15.8333Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_758_636">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default InvoiceIcon;
