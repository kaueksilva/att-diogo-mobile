import { StyleSheet } from 'react-native';
import { colors, radius, shadow, webInputReset } from '../theme/theme';

export const formInputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textBody,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
  },
  inputRowMultiline: {
    alignItems: 'flex-start',
  },
  inputRowFocused: {
    borderColor: colors.accent,
  },
  inputRowError: {
    borderColor: colors.danger,
  },
  icon: {
    marginRight: 10,
  },
  iconMultiline: {
    marginTop: 13,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    ...webInputReset,
  },
  multiline: {
    minHeight: 104,
    textAlignVertical: 'top',
  },
  toggle: {
    padding: 4,
    marginLeft: 8,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
});

export const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    minHeight: 48,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  success: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  danger: {
    backgroundColor: colors.surface,
    borderColor: colors.dangerBorder,
  },
  outline: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.3,
  },
});

export const screenHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 10,
    backgroundColor: colors.primary,
  },
  side: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.2,
  },
});

export const taskCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingRight: 12,
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    ...shadow(1),
  },
  cardDone: {
    opacity: 0.6,
  },
  checkbox: {
    marginRight: 10,
    padding: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
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
    marginTop: 3,
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
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: radius.sm,
    marginRight: 6,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    marginLeft: 12,
    backgroundColor: colors.background,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
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
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textBody,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 21,
  },
});
