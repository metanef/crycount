import { StyleSheet } from 'react-native';
import {colors} from './colors';

const styles = StyleSheet.create({
  cryText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    margin: 20,
  },
  crycountText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    margin: 20,
  },
  circularProgress: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottleIcon: {
    position: 'absolute',
    top: 90,
    zIndex: 1,
  },
  percentageText: {
    position: 'absolute',
    top: 170,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  counter: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    minHeight: 80,
    flexDirection: 'row',
  },
  counterBloc: {
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addCryButton: {
    width: 84,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addCryText: {
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  cryList: {
    marginTop: 20,
    width: 220,
    minHeight: 180,
  },
  cryItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#ddd',
    position: 'relative',
  },
  cryDate: {
    fontSize: 14,
    color: '#555',
  },
  cryNote: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  deleteButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
});

export default styles;
