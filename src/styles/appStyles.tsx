import { StyleSheet } from 'react-native';
import {colors} from './colors';

const appStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  loadingText: {
    fontSize: 20,
    color: '#555',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: colors.primary,
    fontFamily: 'Psycho',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default appStyles;