import React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

export default () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <Mask
        id="mask0_43_937"
        style={{ maskType: "alpha" }}
        width="20"
        height="20"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <Path fill="#D9D9D9" d="M0 0H20V20H0z"></Path>
      </Mask>
      <G mask="url(#mask0_43_937)">
        <Path
          fill="#0B1596"
          d="M9.167 19.166a.806.806 0 01-.594-.24.807.807 0 01-.24-.593V17.5H4.167c-.459 0-.851-.163-1.177-.49a1.605 1.605 0 01-.49-1.177V4.166c0-.458.163-.85.49-1.177.326-.326.718-.49 1.177-.49h4.166v-.833c0-.236.08-.434.24-.593.16-.16.358-.24.594-.24s.434.08.593.24c.16.16.24.357.24.593v16.667c0 .236-.08.434-.24.594a.806.806 0 01-.593.24zm-5-4.166h4.166v-5l-4.166 5zm7.5 2.5V10l4.166 5V4.166h-4.166V2.5h4.166c.459 0 .851.163 1.177.49.327.326.49.718.49 1.176v11.667c0 .458-.163.85-.49 1.177-.326.326-.718.49-1.177.49h-4.166z"
        ></Path>
      </G>
    </Svg>
  )
}