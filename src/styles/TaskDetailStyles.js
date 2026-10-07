import { StyleSheet } from 'react-native';
import { colors, radius, shadow, MAX_CONTENT_WIDTH } from '../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    padding: 18,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    marginLeft: 4,
  },
  priorityRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginBottom: 22,
  },
  priorityChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginHorizontal: 4,
    ...shadow(2),
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  priorityTextActive: {
    color: colors.white,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 22,
    ...shadow(3),
  },
  cardHint: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  photo: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.md,
    backgroundColor: colors.subtle,
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoActions: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  photoActionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: radius.md,
    marginHorizontal: 5,
  },
  photoActionText: {
    fontWeight: '800',
    marginTop: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  locationCoords: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    marginLeft: 10,
  },
  locationBtnRemove: {
    backgroundColor: colors.danger,
  },
  locationBtnText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 13,
    marginLeft: 5,
  },
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  mapLinkText: {
    color: colors.primary,
    fontWeight: '800',
    marginLeft: 4,
  },
  weatherBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
  },
  weatherTemp: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginLeft: 12,
  },
  weatherInfo: {
    flex: 1,
    marginLeft: 12,
  },
  weatherDesc: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textBody,
  },
  weatherMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
    marginLeft: 12,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  statusHint: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteBtn: {
    marginTop: 12,
  },
  meta: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20,
  },
});
