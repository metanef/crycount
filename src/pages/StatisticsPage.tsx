import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appStyles from './../styles/appStyles';
import styles from '../styles/styles';

export default function StatisticsPage() {
  /** Redondance avec home */
  const [cries, setCries] = useState([]);
  const filePath = FileSystem.documentDirectory + 'cries.json';

  const loadCries = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        setCries(JSON.parse(fileContent));
      }
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  loadCries();
  const calculateProgress = (cryCount: number) => {
    const circle1Progress = ((cryCount % 10) * 10);
    const circle2Progress = ((Math.floor(cryCount / 10) % 5) * 20);
    const circle3Progress = ((Math.floor(cryCount / 50) % 5) * 20);
    return { circle1Progress, circle2Progress, circle3Progress };
  };
  
  const { circle1Progress, circle2Progress, circle3Progress } = calculateProgress(cries.length);
  /** Jusqu'ici */
  
  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Statistics Page</Text>
      <View style={styles.counter}>
            <View style={styles.counterBloc}>
              <MaterialCommunityIcons
                name="water-outline"
                size={60}
                color="#6a5acd"
              />
              <Text style={styles.counterText}>{circle1Progress / 10}</Text>
            </View>
            <View style={styles.counterBloc}>
              <MaterialCommunityIcons
                name="cup-outline"
                size={60}
                color="#6a5acd"
              />
              <Text style={styles.counterText}>{circle2Progress/20}</Text>
            </View>
            <View style={styles.counterBloc}>
              <MaterialCommunityIcons
                name="bottle-soda-classic-outline"
                size={60}
                color="#6a5acd"
              />
              <Text style={styles.counterText}>{circle3Progress / 20}</Text>
            </View>
          </View>
    </View>
  );
}
