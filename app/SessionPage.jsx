import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  violet: "#7c3aed",
  violetFaint: "#f5f0ff",
  violetLight: "#ede9fe",
  pageBg: "#f5f3ff",
  cardBg: "#ffffff",
  textDark: "#1e1b4b",
  textMuted: "#7e7a9a",
};

function ThinkingDots() {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay((2 - i) * 150),
        ]),
      ),
    );
    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, []);

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: "#fff",
            opacity: dot,
            transform: [
              {
                scale: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1],
                }),
              },
            ],
          }}
        />
      ))}
    </View>
  );
}

function MessageBubble({ item }) {
  const isUser = item.role === "user";
  return (
    <View
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "78%",
        marginVertical: 4,
        marginHorizontal: 16,
      }}
    >
      <View
        style={{
          backgroundColor: isUser ? "#ede9fe" : COLORS.violet,
          borderRadius: 18,
          borderBottomRightRadius: isUser ? 4 : 18,
          borderBottomLeftRadius: isUser ? 18 : 4,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: isUser ? "#000000" : "#ffffff",
            lineHeight: 22,
          }}
        >
          {item.content}
        </Text>
      </View>
    </View>
  );
}

export default function SessionPage() {
  const router = useRouter();
  const { thread_id: thread_id } = useLocalSearchParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [threadId, setThreadId] = useState(thread_id ?? null);
  const [ended, setEnded] = useState(false);
  const [starting, setStarting] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setStarting(true);
    try {
      const token = await SecureStore.getItemAsync("token");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/patient_thread/${thread_id}`,
        { headers: { authorization: token } },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail ?? "Failed to load history");

      const mapped = data
        .filter((msg) => msg.content?.trim())
        .map((msg) => ({
          role: msg.type === "human" ? "user" : "assistant",
          content: msg.content,
        }));

      setMessages(mapped);
      setThreadId(thread_id);
    } catch (e) {
      setMessages([
        { role: "assistant", content: "Failed to load conversation." },
      ]);
    } finally {
      setStarting(false);
    }
  }

  async function startSession() {
    setStarting(true);
    try {
      const token = await SecureStore.getItemAsync("token");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/patient/chat/start`,
        {
          method: "POST",
          headers: { authorization: token },
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail ?? "Failed to start session");
      setThreadId(data.thread_id);
      setMessages([{ role: "assistant", content: data.response }]);
    } catch (e) {
      setMessages([
        {
          role: "assistant",
          content: "Failed to start session. Please try again.",
        },
      ]);
    } finally {
      setStarting(false);
    }
  }

  async function sendMessage() {
    if (!input.trim() || thinking || ended) return;
    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setThinking(true);

    try {
      const token = await SecureStore.getItemAsync("token");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/patient_send_message`,
        {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ thread_id: threadId, message: text }),
        },
      );
      const data = await res.json();

      if (res.status === 450) {
        setEnded(true);
        return;
      }

      if (!res.ok) throw new Error(data?.detail ?? "Failed to send message");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);

      if (data.open === false) setEnded(true);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  function scrollToBottom() {
    flatListRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1, backgroundColor: COLORS.pageBg }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 56,
            paddingBottom: 16,
            backgroundColor: COLORS.cardBg,
            borderBottomWidth: 0.5,
            borderBottomColor: "#e9e3fc",
          }}
        >
          <Pressable
            onPress={() => router.replace("/HomePage")}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: COLORS.violetFaint,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/move-left.png")}
              style={{ width: 20, height: 20, tintColor: "black" }}
            />
          </Pressable>
          <Text
            style={{ fontSize: 17, fontWeight: "700", color: COLORS.textDark }}
          >
            Session
          </Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Messages */}
        {starting ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color={COLORS.violet} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, i) => String(i)}
            renderItem={({ item }) => <MessageBubble item={item} />}
            contentContainerStyle={{ paddingVertical: 16 }}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            ListFooterComponent={
              thinking ? (
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginHorizontal: 16,
                    marginVertical: 4,
                    backgroundColor: COLORS.violet,
                    borderRadius: 18,
                    borderBottomLeftRadius: 4,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                >
                  <ThinkingDots />
                </View>
              ) : null
            }
          />
        )}

        {/* Ended banner */}
        {ended && (
          <View
            style={{
              backgroundColor: "#f0fdf4",
              borderTopWidth: 0.5,
              borderTopColor: "#bbf7d0",
              paddingVertical: 12,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#15803d", fontWeight: "600" }}>
              Session complete. Your responses have been recorded.
            </Text>
          </View>
        )}

        {/* Input bar */}
        {!ended && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              paddingHorizontal: 16,
              paddingVertical: 12,
              paddingBottom: Platform.OS === "ios" ? 34 : 28,
              backgroundColor: COLORS.cardBg,
              borderTopWidth: 0.5,
              borderTopColor: "#e9e3fc",
              gap: 10,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.textMuted}
              multiline
              style={{
                flex: 1,
                backgroundColor: COLORS.violetFaint,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 10,
                fontSize: 15,
                color: COLORS.textDark,
                maxHeight: 120,
              }}
            />
            <Pressable
              onPress={sendMessage}
              disabled={!input.trim() || thinking}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor:
                  !input.trim() || thinking ? "#c4b5fd" : COLORS.violet,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#0000", fontSize: 12, fontWeight: "bold" }}
              >
                Send
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
