import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { styles } from '../styles/styles';

export default function CircularProgress({ cryCount }) {
  // Logique du calcul de la progression
  const progress = Math.min((cryCount / 100) * 100, 100);
  return (
    <View style={styles.circularProgress}>
      <Svg width={100} height={100}>
        <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="10" />
        <Text>{Math.round(progress)}%</Text>
      </Svg>
    </View>
  );
}
