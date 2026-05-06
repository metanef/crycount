import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appStyles from './../styles/appStyles';
import styles from '../styles/styles';
import { colors } from '../styles/colors';

const FILE_PATH = FileSystem.documentDirectory + 'cries.json';

function calculateProgress(cryCount: number) {
  return {
    circle1Progress: (cryCount % 10) * 10,
    circle2Progress: (Math.floor(cryCount / 10) % 5) * 20,
    circle3Progress: (Math.floor(cryCount / 50) % 5) * 20,
  };
}

export default function StatisticsPage() {
  const [cries, setCries] = useState<any[]>([]);

  // Fixed: loadCries in useEffect, not during render (caused infinite loop)
  useEffect(() => {
    const load = async () => {
      try {
        const info = await FileSystem.getInfoAsync(FILE_PATH);
        if (info.exists) {
          const content = await FileSystem.readAsStringAsync(FILE_PATH);
          setCries(JSON.parse(content));
        }
      } catch (e) {
        console.error('Error loading cries:', e);
      }
    };
    load();
  }, []);

  const total = cries.length;
  const { circle1Progress, circle2Progress, circle3Progress } = calculateProgress(total);

  const drops = total % 10;
  const glasses = Math.floor(total / 10) % 5;
  const bottles = Math.floor(total / 50) % 5;
  const buckets = Math.floor(total / 250);

  // Compute most active day
  const dayCounts: Record<string, number> = {};
  cries.forEach((c) => {
    const day = c.date?.split(' ')[0] ?? 'unknown';
    dayCounts[day] = (dayCounts[day] ?? 0) + 1;
  });
  const topDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0];

  const withNotes = cries.filter((c) => c.note && c.note.length > 0).length;

  return (
    <SafeAreaView style={appStyles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.statsContainer, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[appStyles.title, { marginTop: 16, marginBottom: 20 }]}>Statistiques</Text>

        {/* Hero total */}
        <View style={styles.statsHero}>
          <Text style={styles.statsHeroNumber}>{total}</Text>
          <Text style={styles.statsHeroLabel}>
            pleur{total !== 1 ? 's' : ''} au total
          </Text>
        </View>

        {/* Unit breakdown */}
        <Text style={styles.sectionHeader}>Cumul</Text>
        <View style={styles.statsRow}>
          {[
            { icon: 'water-outline', count: drops, label: 'Larmes' },
            { icon: 'cup-outline', count: glasses, label: 'Verres' },
            { icon: 'bottle-soda-classic-outline', count: bottles, label: 'Bouteilles' },
          ].map(({ icon, count, label }) => (
            <View key={label} style={styles.statsCard}>
              <MaterialCommunityIcons name={icon as any} size={32} color={colors.primary} />
              <Text style={styles.statsCardNumber}>{count}</Text>
              <Text style={styles.statsCardLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Extra stats */}
        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Infos</Text>
        <View style={styles.statsRow}>
          <View style={styles.statsCard}>
            <MaterialCommunityIcons name="note-text-outline" size={28} color={colors.secondary} />
            <Text style={styles.statsCardNumber}>{withNotes}</Text>
            <Text style={styles.statsCardLabel}>Avec note</Text>
          </View>
          <View style={styles.statsCard}>
            <MaterialCommunityIcons name="barrel" size={28} color={colors.tertiary} />
            <Text style={styles.statsCardNumber}>{buckets}</Text>
            <Text style={styles.statsCardLabel}>Bidons</Text>
          </View>
        </View>

        {/* Top day */}
        {topDay && (
          <>
            <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Jour record</Text>
            <View style={[styles.statsCard, { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }]}>
              <View>
                <Text style={[styles.statsCardLabel, { textAlign: 'left' }]}>Date</Text>
                <Text style={[styles.statsCardNumber, { fontSize: 20 }]}>{topDay[0]}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.statsCardLabel, { textAlign: 'right' }]}>Pleurs</Text>
                <Text style={styles.statsCardNumber}>{topDay[1]}</Text>
              </View>
            </View>
          </>
        )}

        {/* Empty hint */}
        {total === 0 && (
          <View style={[styles.emptyState, { marginTop: 40 }]}>
            <MaterialCommunityIcons name="chart-bar" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Pas encore de données.</Text>
            <Text style={styles.emptySubText}>Enregistre tes pleurs depuis l'onglet Home.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}