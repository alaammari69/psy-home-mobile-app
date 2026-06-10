import { StyleSheet } from "react-native";

export const COLORS = {
  violet: "#7c3aed",
  violetFaint: "#f5f0ff",
  pageBg: "#f5f3ff",
  cardBg: "#ffffff",
  textDark: "#1e1b4b",
  textMid: "#3d3a5c",
  textMuted: "#7e7a9a",
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

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.violetFaint,
    alignItems: "center",
    justifyContent: "center",
  },

  backArrow: {
    fontSize: 18,
    color: COLORS.violet,
    fontWeight: "600",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textDark,
  },

  // ── Scroll body ─────────────────────────────

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 48,
  },

  // ── Avatar section ───────────────────────────

  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },

  // Large circle with initials
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  avatarMale: { backgroundColor: "#dbeafe" },
  avatarFemale: { backgroundColor: "#fce7f3" },
  avatarNeutral: { backgroundColor: "#f1f5f9" },

  avatarText: {
    fontSize: 28,
    fontWeight: "700",
  },

  avatarTextMale: { color: "#1d4ed8" },
  avatarTextFemale: { color: "#be185d" },
  avatarTextNeutral: { color: "#475569" },

  fullName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 8,
  },

  // Gender pill badge
  genderBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 6,
  },

  genderMale: { backgroundColor: "#eff6ff", borderColor: "#93c5fd" },
  genderFemale: { backgroundColor: "#fdf2f8", borderColor: "#f9a8d4" },
  genderNeutral: { backgroundColor: "#f8fafc", borderColor: "#cbd5e1" },

  genderBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  genderMaleText: { color: "#1d4ed8" },
  genderFemaleText: { color: "#be185d" },
  genderNeutralText: { color: "#475569" },

  ageText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // ── Info card ────────────────────────────────

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 16,
  },

  // Each row: label left, value right
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  infoLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#f0eaf8",
  },

  // ── States ───────────────────────────────────

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    fontSize: 14,
    color: "#dc2626",
    textAlign: "center",
    paddingHorizontal: 32,
    marginBottom: 12,
  },

  retryButton: {
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
