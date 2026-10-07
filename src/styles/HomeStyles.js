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
    paddingHorizontal: 20,
    paddingBottom: 44,
    borderBottomLeftRadius: radius.xl + 4,
    borderBottomRightRadius: radius.xl + 4,
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
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
  },
  profileBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  profileBtnText: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: -5,
  },
  statTile: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.md,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#5EEAD4',
  },
  toolbar: {
    ...contentWidth,
    paddingHorizontal: 16,
    marginTop: -26,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    ...shadow(5),
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
    ...webInputReset,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    marginRight: 8,
    ...shadow(2),
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    ...shadow(4, colors.primary, 0.3),
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  filterCount: {
    marginLeft: 6,
    minWidth: 20,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.subtle,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  filterCountActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: colors.white,
  },
  listContainer: {
    ...contentWidth,
    flexGrow: 1,
    padding: 16,
    paddingBottom: 120,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 22,
    borderRadius: 32,
    backgroundColor: colors.accent,
    ...shadow(8, colors.accent, 0.4),
  },
  fabInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
