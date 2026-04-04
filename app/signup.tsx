import { View, TextInput, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import LoginStyles from "../styles/loginStyles.ts";
import { handleSignUp } from "../service/firebaseAuth.ts";
import { useAuth } from "../service/firebaseAuth.ts"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  if (currentUser) router.push("/home")

  return (
    <View style={LoginStyles.container}>
      <Pressable
        style={LoginStyles.returnButton}
        onPress={() => router.push("/")}
      >
        <Image
          source={require("../assets/arrow_back.png")}
          style={LoginStyles.returnImage}
        />
      </Pressable>
      <Text style={LoginStyles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={LoginStyles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="grey"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={LoginStyles.input}
        secureTextEntry
        placeholderTextColor="grey"
      />
      <Pressable
        style={LoginStyles.button}
        onPress={() => handleSignUp(email, password, setLoading)}
      >
        <Text style={LoginStyles.buttonText}>Sign up</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/login")}
      >
        <Text>Already have an account? Log in</Text>
      </Pressable>
    </View>
  );
}
