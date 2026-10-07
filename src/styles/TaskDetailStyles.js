import { StyleSheet } from 'react-native';
import { colors, shadow, MAX_CONTENT_WIDTH } from '../theme/theme';

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
    padding: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textBody,
    marginBottom: 8,
  },
  priorityRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginBottom: 20,
  },
  priorityChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginHorizontal: 4,
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 20,
    ...shadow(1, '#000', 0.05),
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
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  removePhotoBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
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
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    marginHorizontal: 4,
  },
  photoActionText: {
    color: colors.primary,
    fontWeight: '700',
    marginTop: 6,
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 12,
  },
  locationBtnRemove: {
    backgroundColor: colors.danger,
  },
  locationBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  mapLinkText: {
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 4,
  },
  weatherBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  weatherTemp: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    marginLeft: 12,
  },
  weatherInfo: {
    flex: 1,
    marginLeft: 12,
  },
  weatherDesc: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textBody,
  },
  weatherMeta: {
    fontSize: 12,
    color: colors.textMuted,
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
    fontWeight: '700',
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
    marginTop: 20,
  },
});
