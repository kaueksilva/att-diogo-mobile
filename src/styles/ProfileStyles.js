import { StyleSheet } from 'react-native';
import { colors, radius, MAX_CONTENT_WIDTH } from '../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  profileTop: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.subtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 30,
    color: colors.text,
    fontWeight: '600',
  },
  profileInfo: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexShrink: 1,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  editNameBtn: {
    marginLeft: 6,
    padding: 4,
  },
  nameEditor: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nameInput: {
    flex: 1,
    marginBottom: 0,
  },
  nameEditorBtn: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  email: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.subtle,
    borderRadius: radius.lg,
    paddingVertical: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.textMuted,
  },
  statCardLast: {
    borderRightWidth: 0,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  apiSection: {
    backgroundColor: colors.subtle,
    padding: 18,
    borderRadius: radius.lg,
    marginBottom: 32,
  },
  apiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  apiTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  quoteText: {
    fontSize: 17,
    color: colors.text,
    lineHeight: 25,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  quoteLoading: {
    marginVertical: 20,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  refreshBtnText: {
    color: colors.accent,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 4,
  },
  actionSpacing: {
    marginBottom: 10,
  },
});
