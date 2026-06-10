import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { COLORS, styles } from "./styles/Profilepage";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calcAge(dob) {
  if (!dob) return "—";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function getInitials(first = "", last = "") {
  return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "—"}</Text>
    </View>
  );
}
async function handleLogout(router) {
  Alert.alert("Logout", "Are you sure you want to logout?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Logout",
      style: "destructive",
      onPress: async () => {
        await SecureStore.deleteItemAsync("token");
        router.dismissAll(); // to prevent going back to the home page using the back button after logging out
        router.replace("/LoginPage");
      },
    },
  ]);
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    setError(null);
    try {
      const token = await SecureStore.getItemAsync("token");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/patient_profile_info`,
        { headers: { authorization: token } },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail ?? `HTTP ${res.status}`);
      setProfile(data?.data ?? data);
    } catch (e) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const isMale = profile?.gender === "male";
  const isFemale = profile?.gender === "female";

  const avatarBg = isMale ? "#dbeafe" : isFemale ? "#fce7f3" : "#f1f5f9";
  const avatarColor = isMale ? "#1d4ed8" : isFemale ? "#be185d" : "#475569";
  const badgeBg = isMale ? "#eff6ff" : isFemale ? "#fdf2f8" : "#f8fafc";
  const badgeBorder = isMale ? "#93c5fd" : isFemale ? "#f9a8d4" : "#cbd5e1";
  const badgeColor = avatarColor;

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace("/HomePage")}
          style={styles.backButton}
        >
          <Image
            source={require("../assets/images/move-left.png")}
            style={{ width: 20, height: 20, tintColor: "black" }}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.violet} />
        </View>
      )}

      {/* Error */}
      {!loading && error && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchProfile}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {/* Content */}
      {!loading && !error && profile && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Avatar section ── */}
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <View
              style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                backgroundColor: avatarBg,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Text
                style={{ fontSize: 28, fontWeight: "700", color: avatarColor }}
              >
                {getInitials(profile.first_name, profile.last_name)}
              </Text>
            </View>

            <Text style={styles.fullName}>
              {profile.first_name} {profile.last_name}
            </Text>
            <Text style={styles.ageText}>
              {calcAge(profile.date_of_birth)} years old
            </Text>
          </View>

          {/* Info card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <InfoRow label="First name" value={profile.first_name} />
            <View style={styles.divider} />
            <InfoRow label="Last name" value={profile.last_name} />
            <View style={styles.divider} />
            <InfoRow label="Username" value={profile.username} />
            <View style={styles.divider} />
            <InfoRow label="CIN" value={profile.cin} />
            <View style={styles.divider} />
            <InfoRow
              label="Date of birth"
              value={formatDate(profile.date_of_birth)}
            />
            <View style={styles.divider} />
            <InfoRow label="Gender" value={profile.gender} />
          </View>
          {/*logout */}
          <Pressable
            onPress={() => {
              handleLogout(router);
            }}
            style={{
              marginTop: 16,
              paddingVertical: 14,
              borderRadius: 12,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#fca5a5",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#dc2626" }}>
              Logout
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}
