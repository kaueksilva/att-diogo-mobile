import { StyleSheet } from 'react-native';
import { colors, radius, MAX_CONTENT_WIDTH } from '../theme/theme';

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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  priorityRow: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: colors.subtle,
    borderRadius: radius.md,
    padding: 3,
  },
  priorityChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: radius.sm + 2,
  },
  priorityChipActive: {
    backgroundColor: colors.surface,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  priorityTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.subtle,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 24,
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
    backgroundColor: colors.border,
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoActions: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  photoActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginHorizontal: 4,
  },
  photoActionText: {
    color: colors.text,
    fontWeight: '500',
    marginLeft: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '500',
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
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    marginLeft: 12,
  },
  locationBtnRemove: {
    backgroundColor: colors.danger,
  },
  locationBtnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 6,
  },
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  mapLinkText: {
    color: colors.accent,
    fontWeight: '500',
    marginLeft: 4,
  },
  weatherBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.textMuted,
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  weatherInfo: {
    flex: 1,
    marginLeft: 12,
  },
  weatherDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
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
    fontWeight: '500',
    color: colors.text,
  },
  statusHint: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteBtn: {
    marginTop: 10,
  },
  meta: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20,
  },
});
