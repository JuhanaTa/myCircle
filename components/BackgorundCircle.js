import React, { useState } from 'react';
import Svg, {
  Circle,
  Rect,
  Defs,
  Stop,
  LinearGradient
} from 'react-native-svg';

import { StyleSheet } from 'react-native';

export default function BackgroundImage() {
  return (
    <>
      <Svg height="100%" width="100%" viewBox="40 0 30 100" style={styles.svg}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#00c6ff" />
            <Stop offset="100%" stopColor="#0072ff" />
          </LinearGradient>
        </Defs>
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="5"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="50"
          r="35"
          stroke="url(#gradient)"
          strokeWidth="5"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="50"
          r="25"
          stroke="url(#gradient)"
          strokeWidth="5"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="50"
          r="15"
          stroke="url(#gradient)"
          strokeWidth="5"
          fill="transparent"
        />
      </Svg>
    </>
  );
}
const styles = StyleSheet.create({
  svg: {
    position: 'absolute'
  }
});
