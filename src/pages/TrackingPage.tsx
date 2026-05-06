import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appStyles from './../styles/appStyles';
import styles from '../styles/styles';
import { colors } from '../styles/colors';

export default function TrackingPage() {
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <View style={[appStyles.container, { justifyContent: 'center' }]}>
        <Text style={[appStyles.title, { marginBottom: 24 }]}>Tracking</Text>
        <View style={styles.comingSoon}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={72}
            color={colors.tertiary}
          />
          <Text style={styles.comingSoonText}>Bientôt disponible</Text>
          <Text style={styles.comingSoonSub}>
            Visualisation calendaire,{'\n'}
            intensité des pleurs,{'\n'}
            tendances mensuelles.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}