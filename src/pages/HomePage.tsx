import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import styles from './../styles/styles';
import appStyles from './../styles/appStyles';
import { colors } from '../styles/colors';

const FILE_PATH = FileSystem.documentDirectory + 'cries.json';

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function calculateProgress(cryCount: number) {
  return {
    circle1Progress: (cryCount % 10) * 10,
    circle2Progress: (Math.floor(cryCount / 10) % 5) * 20,
    circle3Progress: (Math.floor(cryCount / 50) % 5) * 20,
  };
}

export default function HomePage() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [cries, setCries] = useState<any[]>([]);
  const [note, setNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const init = async () => {
      await Font.loadAsync({
        GlassWater: require('../../assets/fonts/Glasswater.otf'),
        Psycho: require('../../assets/fonts/Psycho.otf'),
      });
      setFontsLoaded(true);

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
    init();
  }, []);

  const saveCries = useCallback(async (data: any[]) => {
    try {
      await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving cries:', e);
    }
  }, []);

  const addCry = useCallback(() => {
    const newCry = {
      id: Date.now().toString(),
      date: formatDate(new Date()),
      note: note.trim(),
    };
    const updated = [newCry, ...cries];
    setCries(updated);
    saveCries(updated);
    setNote('');
    setIsAdding(false);
    Keyboard.dismiss();
  }, [cries, note, saveCries]);

  const deleteCry = useCallback((id: string) => {
    const updated = cries.filter((c) => c.id !== id);
    setCries(updated);
    saveCries(updated);
  }, [cries, saveCries]);

  const cancel = useCallback(() => {
    Keyboard.dismiss();
    setNote('');
    setIsAdding(false);
  }, []);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={appStyles.loadingContainer}>
        <Text style={appStyles.loadingText}>Chargement…</Text>
      </SafeAreaView>
    );
  }

  const { circle1Progress, circle2Progress, circle3Progress } = calculateProgress(cries.length);
  const cxy = 50;
  const r1 = 32, r2 = 42, r3 = 52;
  const stroke = 7;
  const circ = (r: number) => 2 * Math.PI * r;

  const drops = cries.length % 10;
  const glasses = Math.floor(cries.length / 10) % 5;
  const bottles = Math.floor(cries.length / 50) % 5;

  return (
    <TouchableWithoutFeedback onPress={cancel}>
      <SafeAreaView style={appStyles.safeArea}>
        <View style={appStyles.container}>

          {/* Header */}
          <Text style={appStyles.title}>CryCount</Text>
          <Text style={styles.subtitle}>
            {cries.length === 0
              ? 'Aucune larme enregistrée'
              : `${cries.length} pleur${cries.length > 1 ? 's' : ''} enregistré${cries.length > 1 ? 's' : ''}`}
          </Text>

          {/* Circular progress */}
          <View style={styles.circularProgress}>
            <MaterialCommunityIcons
              name="water-outline"
              size={72}
              color={colors.primary}
              style={styles.bottleIcon}
            />
            <Text style={styles.percentageText}>{drops}</Text>

            <Svg width={280} height={280} viewBox="-18 -2 136 116">
              {/* Outer track + fill */}
              <Circle cx={cxy} cy={cxy} r={r3} stroke={colors.circleTrack} strokeWidth={stroke} fill="none" />
              <Circle
                cx={cxy} cy={cxy} r={r3}
                stroke={colors.circleOuter} strokeWidth={stroke} fill="none"
                strokeDasharray={circ(r3)}
                strokeDashoffset={circ(r3) - (circle3Progress / 100) * circ(r3)}
                strokeLinecap="round"
                rotation="-90" origin={`${cxy},${cxy}`}
              />
              {/* Mid track + fill */}
              <Circle cx={cxy} cy={cxy} r={r2} stroke={colors.circleTrack} strokeWidth={stroke} fill="none" />
              <Circle
                cx={cxy} cy={cxy} r={r2}
                stroke={colors.circleMid} strokeWidth={stroke} fill="none"
                strokeDasharray={circ(r2)}
                strokeDashoffset={circ(r2) - (circle2Progress / 100) * circ(r2)}
                strokeLinecap="round"
                rotation="-90" origin={`${cxy},${cxy}`}
              />
              {/* Inner track + fill */}
              <Circle cx={cxy} cy={cxy} r={r1} stroke={colors.circleTrack} strokeWidth={stroke} fill="none" />
              <Circle
                cx={cxy} cy={cxy} r={r1}
                stroke={colors.circleInner} strokeWidth={stroke} fill="none"
                strokeDasharray={circ(r1)}
                strokeDashoffset={circ(r1) - (circle1Progress / 100) * circ(r1)}
                strokeLinecap="round"
                rotation="-90" origin={`${cxy},${cxy}`}
              />
            </Svg>
          </View>

          {/* Counter chips */}
          <View style={styles.counter}>
            {[
              { icon: 'water-outline', count: drops, label: 'larmes' },
              { icon: 'cup-outline', count: glasses, label: 'verres' },
              { icon: 'bottle-soda-classic-outline', count: bottles, label: 'bouteilles' },
            ].map(({ icon, count, label }) => (
              <View key={label} style={styles.counterBloc}>
                <MaterialCommunityIcons name={icon as any} size={28} color={colors.primary} />
                <Text style={styles.counterText}>{count}</Text>
                <Text style={styles.counterLabel}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Add cry area */}
          {isAdding ? (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ajouter une note (optionnel)…"
                placeholderTextColor={colors.textMuted}
                value={note}
                onChangeText={setNote}
                onSubmitEditing={addCry}
                autoFocus
                returnKeyType="done"
              />
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.addCryButton, { flex: 1 }]}
                  onPress={addCry}
                >
                  <Text style={styles.addCryText}>💧 Enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.addCryButton, { flex: 1, backgroundColor: colors.cardBgAlt, shadowOpacity: 0 }]}
                  onPress={cancel}
                >
                  <Text style={[styles.addCryText, { color: colors.textSecondary }]}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.addCryButton} onPress={() => setIsAdding(true)}>
              <Text style={styles.addCryText}>+ Ajouter un pleur</Text>
            </TouchableOpacity>
          )}

          {/* List */}
          {cries.length > 0 && (
            <Text style={[styles.sectionHeader, { alignSelf: 'flex-start', marginTop: 20 }]}>
              Historique
            </Text>
          )}
          <FlatList
            style={styles.cryList}
            contentContainerStyle={styles.cryListContent}
            data={cries}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.cryItem}>
                <View style={styles.cryItemHeader}>
                  <View style={styles.cryDot} />
                  <Text style={styles.cryDate}>{item.date}</Text>
                </View>
                {item.note ? <Text style={styles.cryNote}>{item.note}</Text> : null}
                <TouchableOpacity onPress={() => deleteCry(item.id)} style={styles.deleteButton}>
                  <MaterialCommunityIcons name="trash-can-outline" size={16} color={colors.danger} />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="emoticon-sad-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyText}>Aucun pleur enregistré.</Text>
                <Text style={styles.emptySubText}>Appuie sur le bouton pour commencer.</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}