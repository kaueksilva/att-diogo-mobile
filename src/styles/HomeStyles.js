import { StyleSheet } from 'react-native';
import { colors, radius, shadow, webInputReset, MAX_CONTENT_WIDTH } from '../theme/theme';

const contentWidth = {
  width: '100%',
  maxWidth: MAX_CONTENT_WIDTH,
  alignSelf: 'center',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerInner: {
    ...contentWidth,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
    marginRight: 12,
  },
  date: {
    fontSize: 12,
    color: colors.primaryBorder,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  progressCard: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  progressLabel: {
    color: colors.primaryBorder,
    fontSize: 13,
  },
  progressPercent: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7FB3E6',
  },
  toolbar: {
    ...contentWidth,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 11,
    marginLeft: 8,
    fontSize: 15,
    color: colors.text,
    ...webInputReset,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
  },
  filterChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: radius.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  filterCount: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  filterCountActive: {
    color: colors.primaryBorder,
  },
  listContainer: {
    ...contentWidth,
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 18,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    ...shadow(4, '#101828', 0.2),
  },
  fabText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
});
