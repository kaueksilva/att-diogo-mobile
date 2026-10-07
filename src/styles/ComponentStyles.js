import { StyleSheet } from 'react-native';
import { colors, radius, shadow, webInputReset } from '../theme/theme';

export const formInputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textBody,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 14,
  },
  inputRowMultiline: {
    alignItems: 'flex-start',
  },
  inputRowFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  inputRowError: {
    borderColor: colors.danger,
  },
  icon: {
    marginRight: 10,
  },
  iconMultiline: {
    marginTop: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 16,
    color: colors.text,
    ...webInputReset,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  toggle: {
    padding: 4,
    marginLeft: 8,
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 4,
  },
});

export const buttonStyles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.md,
  },
  wrapperPrimary: {
    backgroundColor: colors.primary,
    ...shadow(6, colors.accent, 0.35),
  },
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    minHeight: 54,
  },
  primary: {},
  success: {
    backgroundColor: colors.success,
  },
  danger: {
    backgroundColor: colors.dangerLight,
  },
  outline: {
    backgroundColor: colors.primaryLight,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.2,
  },
});

export const screenHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 16,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  side: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '800',
    color: colors.white,
  },
});

export const taskCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 12,
    ...shadow(3),
  },
  cardDone: {
    opacity: 0.55,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
    marginRight: 6,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    marginLeft: 12,
    backgroundColor: colors.subtle,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.dangerLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export const emptyStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
