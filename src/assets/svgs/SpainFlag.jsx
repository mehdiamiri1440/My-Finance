import React from 'react';
import { Svg, Rect, Path, G, Defs, ClipPath } from 'react-native-svg';

function USAFlag() {
  return (
    <Svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_23_23)">
        <Rect width="23" height="23" fill="#B22234" />
        <Path fill="#fff" d="M0 2.3h23v2.3H0zm0 4.6h23v2.3H0zm0 4.6h23v2.3H0zm0 4.6h23v2.3H0zm0 4.6h23v2.3H0z" />
        <Rect width="9.2" height="10.35" fill="#3C3B6E" />
        <Path
          d="M1.1 1.1h.55v.55H1.1zm2.2 0h.55v.55H3.3zm2.2 0h.55v.55H5.5zm2.2 0h.55v.55H7.7zm1.1 1.1h.55v.55H8.8zm-2.2 0h.55v.55H6.6zm-2.2 0h.55v.55H4.4zm-2.2 0h.55v.55H2.2zm-1.1 1.1h.55v.55H1.1zm2.2 0h.55v.55H3.3zm2.2 0h.55v.55H5.5zm2.2 0h.55v.55H7.7zm1.1 1.1h.55v.55H8.8zm-2.2 0h.55v.55H6.6zm-2.2 0h.55v.55H4.4zm-2.2 0h.55v.55H2.2zm-1.1 1.1h.55v.55H1.1zm2.2 0h.55v.55H3.3zm2.2 0h.55v.55H5.5zm2.2 0h.55v.55H7.7zm1.1 1.1h.55v.55H8.8zm-2.2 0h.55v.55H6.6zm-2.2 0h.55v.55H4.4zm-2.2 0h.55v.55H2.2zm-1.1 1.1h.55v.55H1.1zm2.2 0h.55v.55H3.3zm2.2 0h.55v.55H5.5zm2.2 0h.55v.55H7.7zm1.1 1.1h.55v.55H8.8zm-2.2 0h.55v.55H6.6zm-2.2 0h.55v.55H4.4zm-2.2 0h.55v.55H2.2z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_23_23">
          <Rect width="23" height="23" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default USAFlag;
