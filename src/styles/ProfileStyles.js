import { StyleSheet } from 'react-native';
import { colors, shadow, MAX_CONTENT_WIDTH } from '../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  profileTop: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...shadow(6, colors.primary, 0.4),
  },
  avatarText: {
    fontSize: 42,
    color: colors.white,
    fontWeight: '900',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
  },
  editNameBtn: {
    marginLeft: 8,
    padding: 4,
  },
  nameEditor: {
    width: '100%',
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
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  email: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    ...shadow(2),
  },
  statValue: {
    fontSize: 26,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  apiSection: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderTopWidth: 4,
    borderTopColor: colors.success,
    ...shadow(3),
  },
  apiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  apiTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.success,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  offlineText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  quoteText: {
    fontSize: 17,
    fontStyle: 'italic',
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    textAlign: 'right',
  },
  quoteLoading: {
    marginVertical: 24,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    marginTop: 8,
  },
  refreshBtnText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  actionSpacing: {
    marginBottom: 12,
  },
});
