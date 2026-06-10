import { StyleSheet } from "react-native";

export const COLORS = {
  violet: "#7c3aed",
  violetMid: "#8b5cf6",
  violetFaint: "#f5f0ff",
  pageBg: "#f5f3ff",
  cardBg: "#ffffff",
  textDark: "#1e1b4b",
  textMuted: "#7e7a9a",
  disabledBg: "#f0eef8",
  disabledText: "#b0aac8",
  disabledBorder: "#e2ddf0",
  green: "#16a34a",
  greenBg: "#dcfce7",
  sky: "#0284c7",
  skyBg: "#e0f2fe",
  skyBorder: "#bae6fd",
  amber: "#b45309",
  amberBg: "#fef3c7",
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },

  // ── Header ──────────────────────────────────

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: COLORS.cardBg,
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerLogoBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.violet,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  headerAppName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
    letterSpacing: -0.3,
  },

  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.violetFaint,
    borderWidth: 1.5,
    borderColor: "#d8d0f5",
    alignItems: "center",
    justifyContent: "center",
  },

  profileButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },

  // ── List ────────────────────────────────────

  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  listHeader: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 2,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
  },

  // ── Session card (active / completed) ───────

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ede9fe",
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },

  // ── Session card (in-progress / disabled) ───

  // Greyed out, no shadow, not pressable
  cardDisabled: {
    backgroundColor: COLORS.disabledBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.disabledBorder,
  },

  // ── Card inner ───────────────────────────────

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Circle with session number — mirrors the web version
  sessionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.skyBg,
    borderWidth: 1,
    borderColor: COLORS.skyBorder,
    alignItems: "center",
    justifyContent: "center",
  },

  sessionCircleDisabled: {
    backgroundColor: COLORS.disabledBg,
    borderColor: COLORS.disabledBorder,
  },

  sessionCircleText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.sky,
  },

  sessionCircleTextDisabled: {
    color: COLORS.disabledText,
  },

  sessionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 2,
  },

  sessionDate: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  textDisabled: {
    color: COLORS.disabledText,
  },

  // ── Status badge ─────────────────────────────

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeDone: {
    backgroundColor: COLORS.greenBg,
  },

  badgeInProgress: {
    backgroundColor: COLORS.amberBg,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },

  badgeTextDone: {
    color: COLORS.green,
  },

  badgeTextInProgress: {
    color: COLORS.amber,
  },

  // ── States ───────────────────────────────────

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },

  emptyText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 8,
  },

  errorText: {
    fontSize: 14,
    color: "#dc2626",
    textAlign: "center",
    paddingHorizontal: 32,
  },

  retryButton: {
    marginTop: 14,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: COLORS.violet,
    borderRadius: 10,
  },

  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
