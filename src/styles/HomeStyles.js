import { StyleSheet } from 'react-native';
import { colors, shadow, webInputReset, MAX_CONTENT_WIDTH } from '../theme/theme';

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
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    ...shadow(8, colors.primary, 0.35),
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
  greeting: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.white,
  },
  date: {
    fontSize: 14,
    color: colors.primaryBorder,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  profileBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow(4, '#000', 0.2),
  },
  profileBtnText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  progressCard: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  progressPercent: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 18,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#34D399',
  },
  toolbar: {
    ...contentWidth,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 15,
    color: colors.text,
    ...webInputReset,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  filterCount: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '800',
    color: colors.textMuted,
  },
  filterCountActive: {
    color: colors.primaryBorder,
  },
  listContainer: {
    ...contentWidth,
    flexGrow: 1,
    padding: 16,
    paddingBottom: 110,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow(8, colors.primary, 0.4),
  },
});
