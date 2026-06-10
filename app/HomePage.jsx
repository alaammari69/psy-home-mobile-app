import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { COLORS, styles } from "./styles/HomePage";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

// "2026-04-26T10:40:39.359913" → "26 Apr 2026 · 10:40"
function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─────────────────────────────────────────────────────────────
// SessionCard
// ─────────────────────────────────────────────────────────────
function SessionCard({ thread, index, total, onPress }) {
  const done = !thread.status; // status=true means "in progress", false means "completed" (matches your web version)

  return (
    <Pressable
      disabled={!thread.status} // in-progress sessions are not tappable yet
      onPress={() => onPress(thread)}
      style={({ pressed }) => [
        thread.status ? styles.cardDisabled : styles.card,
        !thread.status && pressed && styles.cardPressed,
      ]}
    >
      {/* Top row: session number circle + info + badge */}
      <View style={styles.cardRow}>
        {/* Circle with session number — same as your web version */}
        <View
          style={[
            styles.sessionCircle,
            !thread.status && styles.sessionCircleDisabled,
          ]}
        >
          <Text
            style={[
              styles.sessionCircleText,
              !thread.status && styles.sessionCircleTextDisabled,
            ]}
          >
            {String(total - index).padStart(2, "0")}
          </Text>
        </View>

        {/* Session title + date */}
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={[styles.sessionTitle, !thread.status && styles.textDisabled]}
          >
            Session {total - index}
          </Text>
          <Text
            style={[styles.sessionDate, !thread.status && styles.textDisabled]}
          >
            {formatDateTime(thread.created_at)}
          </Text>
        </View>

        {/* Status badge */}
        <View
          style={[
            styles.badge,
            thread.status ? styles.badgeInProgress : styles.badgeDone,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              thread.status ? styles.badgeTextInProgress : styles.badgeTextDone,
            ]}
          >
            {thread.status ? "In progress" : "Completed"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// ─────────────────────────────────────────────────────────────
// HomePage
// ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  async function fetchThreads() {
    setLoading(true);
    setError(null);
    try {
      const token = await SecureStore.getItemAsync("token");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/patient_sessions`,
        {
          headers: { authorization: token },
        },
      );
      if (!res.ok) throw new Error(res.data);
      const data = await res.json();
      // sort newest first, same as web version
      setThreads(
        [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        ),
      );
    } catch (e) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleSessionPress = (thread) => {
    router.push({
      pathname: "/SessionPage",
      params: { thread_id: thread.thread_id },
    });
  };

  const handleProfilePress = () => {
    // TODO: navigate to profile screen
    router.push("/Profilepage");
  };

  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerLogoBox}>
            <Image
              source={require("../assets/images/brain.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: "white",
              }}
            />
          </View>
          <Text style={styles.headerAppName}>PsyHome</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.profileButton,
            pressed && styles.profileButtonPressed,
          ]}
          onPress={handleProfilePress}
        >
          <Text style={{ fontSize: 18 }}>👤</Text>
        </Pressable>
      </View>

      {/* ── Loading ── */}
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.violet} />
        </View>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchThreads}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {/* ── List ── */}
      {!loading && !error && (
        <FlatList
          data={threads}
          keyExtractor={(item) => item.thread_id.toString()}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>Sessions</Text>
              <Text style={styles.sectionSubtitle}>
                {threads.filter((t) => !t.status).length} completed ·{" "}
                {threads.filter((t) => t.status).length} in progress
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No sessions found</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <SessionCard
              thread={item}
              index={index}
              total={threads.length}
              onPress={handleSessionPress}
            />
          )}
        />
      )}
    </View>
  );
}
