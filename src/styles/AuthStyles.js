import { StyleSheet } from 'react-native';
import { colors, radius, shadow } from '../theme/theme';

/** Estilos compartilhados pelas telas de Login e Cadastro. */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 4,
    borderTopColor: colors.primary,
    padding: 24,
    ...shadow(2),
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerLight,
    borderColor: colors.dangerBorder,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
    padding: 12,
    borderRadius: radius.sm,
    marginBottom: 18,
  },
  errorBannerText: {
    flex: 1,
    color: colors.dangerDark,
    fontWeight: '500',
    marginLeft: 8,
  },
  button: {
    marginTop: 6,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  demoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  demoTitle: {
    fontWeight: '600',
    color: colors.primary,
    fontSize: 14,
  },
  demoSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 14,
  },
});
