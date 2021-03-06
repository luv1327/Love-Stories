import * as React from 'react';
import Svg, {Rect, Pattern, Defs, Image, Use} from 'react-native-svg';

export default function HeartLogo() {
  return (
    <Svg
      width="80"
      height="60"
      viewBox="0 0 202 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <Rect width="202" height="176" fill="url(#pattern0)" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use
            xlinkHref="#image0_118:2"
            transform="translate(0 -0.000992063) scale(0.015873 0.0182179)"
          />
        </Pattern>
        <Image
          id="image0_118:2"
          width="63"
          height="55"
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}
