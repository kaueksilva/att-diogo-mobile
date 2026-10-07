import { StyleSheet } from 'react-native';
import { colors, radius, shadow } from '../theme/theme';

/** Estilos compartilhados pelas telas de Login e Cadastro. */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  hero: {
    paddingHorizontal: 24,
    paddingBottom: 56,
  },
  heroContent: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    marginTop: -28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerLight,
    padding: 12,
    borderRadius: radius.md,
    marginBottom: 16,
  },
  errorBannerText: {
    flex: 1,
    color: colors.dangerDark,
    fontWeight: '600',
    marginLeft: 8,
  },
  button: {
    marginTop: 8,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: 12,
    marginTop: 18,
  },
  demoIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow(3, colors.primary, 0.3),
  },
  demoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  demoTitle: {
    fontWeight: '800',
    color: colors.primaryDark,
    fontSize: 15,
  },
  demoSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 15,
  },
});
