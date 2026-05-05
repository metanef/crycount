import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, View, Text, TextInput, FlatList,
  StyleSheet,TouchableOpacity, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import styles from './src/styles/styles';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [cries, setCries] = useState([]);
  const [note, setNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const filePath = FileSystem.documentDirectory + 'cries.json';

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        GlassWater: require('./assets/fonts/Glasswater.otf'),
        Psycho: require('./assets/fonts/Psycho.otf'),
      });
      setFontsLoaded(true);
    };

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

    loadFonts();
    loadCries();
  }, []);

  const saveCriesToFile = async (data) => {
    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
      console.log('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const addCry = () => {
    const newCry = {
      id: Date.now().toString(),
      date: formatDate(new Date()),
      note: note.trim(),
    };
    const updatedCries = [newCry, ...cries];
    setCries(updatedCries);
    saveCriesToFile(updatedCries);
    setNote('');
    setIsAdding(false);
  };

  const deleteCry = (id) => {
    const updatedCries = cries.filter((cry) => cry.id !== id);
    setCries(updatedCries);
    saveCriesToFile(updatedCries);
  };

  const calculateProgress = (cryCount) => {
    // Cercle 1 : 10% par cry, réinitialisé tous les 10 cries
    const circle1Progress = ((cryCount % 10) * 10);
    // Cercle 2 : 20% par 10 cries, réinitialisé tous les 50 cries
    const circle2Progress = ((Math.floor(cryCount / 10) % 5) * 20);
    // Cercle 3 : 20% par 50 cries, réinitialisé tous les 250 cries
    const circle3Progress = ((Math.floor(cryCount / 50) % 5) * 20);
    return { circle1Progress, circle2Progress, circle3Progress };
  };
  
  
  const { circle1Progress, circle2Progress, circle3Progress } = calculateProgress(cries.length);
  const progress = Math.min((cries.length / 100) * 100, 100);
  const cxy = 50;
  const innerCircle = 35;
  const midCircle = 45;
  const outerCircle = 55;
  const stroke = 8;
  const progressCalculInner = 2 * Math.PI * innerCircle;
  const progressCalculMid = 2 * Math.PI * midCircle;
  const progressCalculOuter = 2 * Math.PI * outerCircle;

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
        Keyboard.dismiss();
        setNote('');
        setIsAdding(false);
      }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>CryCount</Text>

          <View style={styles.circularProgress}>
            <MaterialCommunityIcons
              name="water-outline"
              size={80}
              color="#6a5acd"
              style={styles.bottleIcon}
            />
            <Text style={styles.percentageText}>{Math.round(progress)}</Text>
            <Svg width={300} height={300} viewBox="-15 0 130 100">
              {/* Cercle externe */}
              <Circle cx={cxy} cy={cxy} r={outerCircle} stroke="#e8e8e8" strokeWidth={stroke} fill="none" />
              <Circle
                cx={cxy}
                cy={cxy}
                r={outerCircle}
                stroke="#c49ccf"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={progressCalculOuter}
                strokeDashoffset={progressCalculOuter - (circle3Progress / 100) * progressCalculOuter}
                strokeLinecap="round"
              />
              {/* Cercle intermédiaire */}
              <Circle cx={cxy} cy={cxy} r={midCircle} stroke="#e8e8e8" strokeWidth={stroke} fill="none" />
              <Circle
                cx={cxy}
                cy={cxy}
                r={midCircle}
                stroke="#9370db"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={progressCalculMid}
                strokeDashoffset={progressCalculMid - (circle2Progress / 100) * progressCalculMid}
                strokeLinecap="round"
              />
              {/* Cercle central */}
              <Circle cx={cxy} cy={cxy} r={innerCircle} stroke="#e8e8e8" strokeWidth={stroke} fill="none" />
              <Circle
                cx={cxy}
                cy={cxy}
                r={innerCircle}
                stroke="#6a5acd"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={progressCalculInner}
                strokeDashoffset={progressCalculInner - (circle1Progress / 100) * progressCalculInner}
                strokeLinecap="round"
              />
            </Svg>
          </View>

          {isAdding ? (
            <View>
              <TouchableOpacity style={styles.addCryButton} onPress={addCry}>
                <Text style={styles.addCryText}>Save Cry</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Add a note (optional)"
                value={note}
                onChangeText={setNote}
                onSubmitEditing={() => {
                  addCry();
                }}
              />
            </View>
          ) : (
            <TouchableOpacity style={styles.addCryButton} onPress={() => setIsAdding(true)}>
              <Text style={styles.addCryText}>Add Cry</Text>
            </TouchableOpacity>
          )}

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

          <FlatList
            style={styles.cryList}
            data={cries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cryItem}>
                <Text style={styles.cryDate}>{item.date}</Text>
                {item.note ? <Text style={styles.cryNote}>{item.note}</Text> : null}
                <TouchableOpacity onPress={() => deleteCry(item.id)} style={styles.deleteButton}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color="#ff6347"
                  />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No cries recorded yet.</Text>}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}