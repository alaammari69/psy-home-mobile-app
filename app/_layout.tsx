import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    //SecureStore.deleteItemAsync("token"); //to delete later ...
    // this method is called on stratup
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      const isValid = await validate_token(token);
      if (isValid) {
        router.replace("/HomePage");
      } else {
        await SecureStore.deleteItemAsync("token");
        router.replace("/LoginPage");
      }
    } else {
      router.replace("/LoginPage");
    }
  }

  async function validate_token(token: string): Promise<boolean> {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/patient/validate_token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", authorization: token },
        },
      );
      if (!res.ok) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
