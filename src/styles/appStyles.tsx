import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

const appStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 80,
    color: colors.primary,
    fontFamily: 'Psycho',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 3,
    letterSpacing: 1,
  },
});

export default appStyles;