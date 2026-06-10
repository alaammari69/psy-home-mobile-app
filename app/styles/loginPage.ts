import { Platform, StyleSheet } from "react-native";

// ─────────────────────────────────────────────
// Brand colors — change these to retheme the
// entire login screen from one place
// ─────────────────────────────────────────────
export const COLORS = {
  /** Primary violet — buttons, focus rings, logo box */
  violet: "#7c3aed",
  /** Lighter violet for hover/pressed tints */
  violetMid: "#8b5cf6",
  /** Very light violet used for input background on focus */
  violetFaint: "#f5f0ff",
  /** Page background */
  pageBg: "#f5f3ff",
  /** Card background */
  cardBg: "#ffffff",
  /** Input background (default) */
  inputBg: "#faf9ff",
  /** Input border (default) */
  inputBorder: "#e0daf5",
  /** Dark text — headings */
  textDark: "#1e1b4b",
  /** Medium text — subtitles, labels */
  textMid: "#3d3a5c",
  /** Muted text — placeholders, footer */
  textMuted: "#7e7a9a",
  /** Placeholder color inside TextInput */
  placeholder: "#a0a0b0",
};

// ─────────────────────────────────────────────
// All styles for loginPage.tsx
// Grouped by section so it's easy to find what
// you're looking for
// ─────────────────────────────────────────────
export const styles = StyleSheet.create({
  // ── Layout ──────────────────────────────────

  /**
   * Root wrapper — fills the entire screen.
   * KeyboardAvoidingView needs flex:1 to work correctly,
   * otherwise it collapses to 0 height on Android.
   */
  root: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },

  /**
   * ScrollView inner container.
   * `flexGrow: 1` + `justifyContent: "center"` keeps
   * the content vertically centered even when the
   * keyboard is not open and there's extra space.
   */
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },

  /**
   * Main content column — adds horizontal padding
   * and vertical breathing room around everything.
   */
  container: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: "center",
  },

  // ── Decorative background blobs ─────────────
  // These are just plain Views styled as large
  // circles (borderRadius = half of width/height).
  // `position: "absolute"` takes them out of the
  // normal flow so they don't push content around.

  /** Top-right decorative circle */
  topBlob: {
    position: "absolute",
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130, // half of 260 → perfect circle
    backgroundColor: "#ddd6fe",
    opacity: 0.6,
  },

  /** Bottom-left decorative circle */
  bottomBlob: {
    position: "absolute",
    bottom: -100,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150, // half of 300
    backgroundColor: "#c4b5fd",
    opacity: 0.35,
  },

  // ── Logo section ────────────────────────────

  /** Centers the icon, app name, and tagline */
  logoWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },

  /**
   * The violet rounded square behind the Brain icon.
   * Matches the brand mark from the web version.
   * Shadow properties work on iOS; `elevation` is the
   * Android equivalent.
   */
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.violet,
    alignItems: "center",
    justifyContent: "center",
    // iOS shadow
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    // Android shadow
    elevation: 8,
    marginBottom: 12,
  },

  /** "PsyHome" app name */
  logoText: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textDark,
    letterSpacing: -0.5, // tighten large bold text slightly
  },

  /** Tagline below the app name */
  logoSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 3,
    letterSpacing: 0.2,
  },

  // ── Card ────────────────────────────────────

  /**
   * White rounded card that wraps the form.
   * `width: "100%"` fills the container's horizontal
   * padding so it doesn't shrink on wide screens.
   */
  card: {
    width: "100%",
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 28,
    // Soft violet-tinted shadow — more interesting than pure black
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },

  /** "Welcome back" heading */
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },

  /** "Sign in to your account" subtitle */
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 24,
  },

  // ── Form fields ─────────────────────────────

  /** Wraps label + input for one field */
  fieldGroup: {
    marginBottom: 16,
  },

  /** "Email" / "Password" label above each input */
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMid,
    marginBottom: 6,
  },

  /**
   * Border wrapper around the TextInput.
   * We wrap the input instead of styling it directly
   * because React Native's TextInput border handling
   * is inconsistent across platforms.
   */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 14,
    // iOS needs explicit vertical padding; Android is fine with less
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
  },

  /**
   * Applied on top of inputWrapper when the field is focused.
   * Only overrides borderColor and backgroundColor —
   * all other styles are inherited from inputWrapper.
   */
  inputWrapperFocused: {
    borderColor: COLORS.violetMid,
    backgroundColor: COLORS.violetFaint,
  },

  /**
   * The actual TextInput.
   * `padding: 0` prevents Android from adding extra
   * internal padding that would misalign the text.
   */
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    padding: 0,
  },

  // ── Forgot password ─────────────────────────

  /**
   * Align to the right side of the card.
   * Negative marginTop pulls it up closer to the
   * password field rather than sitting too far below.
   */
  forgotWrapper: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: -4,
  },

  forgotText: {
    fontSize: 13,
    color: COLORS.violet,
    fontWeight: "500",
  },

  // ── Sign in button ───────────────────────────

  /**
   * Full-width primary action button.
   * The violet shadow gives it a "glowing" effect
   * that matches the logo box.
   */
  loginButton: {
    backgroundColor: COLORS.violet,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },

  /**
   * Visual feedback when the button is pressed.
   * Slight scale-down + opacity change feels snappy
   * without needing an animation library.
   */
  loginButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // ── Footer ───────────────────────────────────

  /** Small disclaimer below the card */
  footer: {
    marginTop: 28,
    fontSize: 12,
    color: "#9490b0",
    textAlign: "center",
    lineHeight: 18, // a bit of extra breathing room between lines
  },
});
