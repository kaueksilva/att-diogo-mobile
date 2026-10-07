import { StyleSheet } from 'react-native';
import { colors, radius, webInputReset, MAX_CONTENT_WIDTH } from '../theme/theme';

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
    paddingHorizontal: 20,
  },
  headerInner: {
    ...contentWidth,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 12,
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.subtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBtnText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.8,
    marginTop: 6,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.subtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  toolbar: {
    ...contentWidth,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.subtle,
    borderRadius: radius.md,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 11,
    marginLeft: 6,
    fontSize: 16,
    color: colors.text,
    ...webInputReset,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 14,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    marginRight: 6,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  filterCount: {
    marginLeft: 6,
    fontSize: 13,
    color: colors.textMuted,
  },
  filterCountActive: {
    color: colors.textMuted,
  },
  listContainer: {
    ...contentWidth,
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 110,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
