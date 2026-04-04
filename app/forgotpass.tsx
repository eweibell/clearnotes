import { View, TextInput, Text, Pressable } from "react-native";
import { router } from "expo-router";
import LoginStyles from "../styles/loginStyles";
import { useState } from "react";

export default function Forgotpass() {
  const [email, setEmail] = useState("")
  const handleGetPasswordLink = async () => {
    console.log("getPasswordLink Running")
  }

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={LoginStyles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Pressable
        style={LoginStyles.button}
        onPress={handleGetPasswordLink}
      >
        <Text style={LoginStyles.buttonText}>Get Link</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/")}
      >
        <Text>Return to front page</Text>
      </Pressable>
    </View>
  );
}
