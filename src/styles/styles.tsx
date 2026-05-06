import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({

  // ─── Subtitle ───────────────────────────────────────────
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    letterSpacing: 0.4,
    marginBottom: 16,
  },

  // ─── Cry summary text ───────────────────────────────────
  cryText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  crycountText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },

  // ─── Circular progress ──────────────────────────────────
  circularProgress: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  bottleIcon: {
    position: 'absolute',
    top: 82,
    zIndex: 1,
  },
  percentageText: {
    position: 'absolute',
    top: 162,
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },

  // ─── Counter row ────────────────────────────────────────
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  counterBloc: {
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 76,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  counterText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  counterLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ─── Add cry button ─────────────────────────────────────
  addCryButton: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingHorizontal: 32,
    paddingVertical: 14,
    alignSelf: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  addCryButtonActive: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },
  addCryText: {
    color: colors.textOnPrimary,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 1.5,
  },

  // ─── Note input ─────────────────────────────────────────
  inputWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: 10,
  },

  // ─── Cry list ───────────────────────────────────────────
  cryList: {
    width: '100%',
    marginTop: 8,
  },
  cryListContent: {
    paddingBottom: 100,
  },

  // ─── Section header ─────────────────────────────────────
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
    marginTop: 4,
    paddingHorizontal: 2,
  },

  // ─── Cry item card ──────────────────────────────────────
  cryItem: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    paddingRight: 44,
    marginBottom: 8,
    flexDirection: 'column',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
    position: 'relative',
  },
  cryItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  cryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryLight,
  },
  cryDate: {
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: 0.3,
  },
  cryNote: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
    fontWeight: '500',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: colors.dangerGhost,
    borderRadius: 10,
    padding: 6,
  },

  // ─── Empty state ────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  emptySubText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 13,
    opacity: 0.7,
  },

  // ─── Stats page ─────────────────────────────────────────
  statsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
  },
  statsHero: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  statsHeroNumber: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.textOnPrimary,
    lineHeight: 56,
  },
  statsHeroLabel: {
    fontSize: 13,
    color: colors.textLabel,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  statsCardNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 8,
  },
  statsCardLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },

  // ─── Tracking page ──────────────────────────────────────
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  comingSoonText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  comingSoonSub: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },

  // ─── Legacy aliases (keep compatibility) ────────────────
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    color: colors.primary,
    fontFamily: 'Psycho',
    textAlign: 'center',
  },
});

export default styles;