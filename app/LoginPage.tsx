import * as SecureStore from "expo-secure-store"; // to save the token later

import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./styles/loginPage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);

  // tracks which field is currently selected to highlight the border
  const [focusedField, setFocusedField] = useState<
    "username" | "password" | null
  >(null);

  // controls the loading spinner on the login button
  const [loading, setLoading] = useState(false);

  // for shwing errors
  const [errors, setErrors] = useState(null);

  async function handleLogin() {
    setLoading(true);

    setErrors(null);
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/patient/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.detail);
      } else {
        await SecureStore.setItemAsync("token", data.token);
        router.replace("/HomePage");
      }
    } catch {
      setErrors("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    /*
      KeyboardAvoidingView to automatically shift the layout up when keyboard appears
     padding mode works best on ios and height for android
     */
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* two blobs for decoration  */}
        <View style={styles.topBlob} />
        <View style={styles.bottomBlob} />

        <View style={styles.container}>
          {/* logo */}
          <View style={styles.logoWrapper}>
            <View style={styles.logoBox}>
              <Image
                source={require("../assets/images/brain.png")}
                style={{ resizeMode: "contain", tintColor: "white" }}
              />
            </View>

            <Text style={styles.logoText}>PsyHome</Text>
            <Text style={styles.logoSub}>
              AI-Assisted Psychiatric Diagnostics
            </Text>
          </View>

          {/* form*/}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome</Text>
            <Text style={styles.cardSubtitle}>Login to your account</Text>

            {/* username */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Username</Text>

              {/*
               * We wrap the TextInput in a View so we can control
               * the border and background independently from the
               * input itself — React Native's TextInput border
               * rendering is inconsistent across platforms.
               */}
              <View
                style={[
                  styles.inputWrapper,
                  // Conditionally add the focus style when this field is active
                  focusedField === "username" && styles.inputWrapperFocused,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="username123"
                  placeholderTextColor="#a0a0b0"
                  value={username}
                  onChangeText={setUsername}
                  keyboardType="email-address"
                  autoCapitalize="none" // don't capitalize the first letter
                  autoCorrect={false} // don't autocorrect email addresses
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>

              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "password" && styles.inputWrapperFocused,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#a0a0b0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!visible} // hides the characters as the user types
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable
                  style={{ marginRight: "auto" }}
                  onPress={() => {
                    setVisible(!visible);
                  }}
                >
                  {visible ? (
                    <Image
                      source={require("../assets/images/eye.png")}
                      style={{ width: 20, height: 20, tintColor: "black" }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/images/eye-off.png")}
                      style={{ width: 20, height: 20, tintColor: "black" }}
                    />
                  )}
                </Pressable>
              </View>
              {errors && <Text style={{ color: "red" }}>{errors}</Text>}
            </View>

            {/* login button */}
            {/*
             * Pressable gives us the `pressed` state for free
             * so we can apply a scale + opacity effect without
             * needing Animated or a third-party library.
             */}
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
              onPress={handleLogin}
              disabled={loading} // prevent double-tap while request is running
            >
              {/* Show a spinner while the auth request is in flight,
                  otherwise show the normal button label */}
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Sign in</Text>
              )}
            </Pressable>
          </View>

          {/* ── Footer disclaimer ───────────────────────── */}
          <Text style={styles.footer}>
            For authorised patients only.{"\n"}
            Contact your psychologist for access.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
