import { StyleSheet } from 'react-native';
import { colors, radius, webInputReset } from '../theme/theme';

export const formInputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 14,
  },
  inputRowMultiline: {
    alignItems: 'flex-start',
  },
  inputRowFocused: {
    backgroundColor: colors.surface,
    borderColor: colors.accent,
  },
  inputRowError: {
    borderColor: colors.danger,
  },
  icon: {
    marginRight: 10,
  },
  iconMultiline: {
    marginTop: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
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
    marginTop: 6,
  },
});

export const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    minHeight: 52,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  success: {
    backgroundColor: colors.accent,
  },
  danger: {
    backgroundColor: colors.dangerLight,
  },
  outline: {
    backgroundColor: colors.subtle,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export const screenHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 6,
    backgroundColor: colors.background,
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
    color: colors.text,
  },
});

export const taskCardStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowDone: {
    opacity: 0.45,
  },
  checkbox: {
    marginRight: 12,
    padding: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 2,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 3,
  },
  metaTextAfterDot: {
    marginLeft: 0,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    marginLeft: 12,
    backgroundColor: colors.subtle,
  },
  deleteBtn: {
    padding: 8,
    marginLeft: 4,
  },
});

export const emptyStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    marginBottom: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
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
