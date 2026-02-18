import { View, TextField, TextInput, Text, Linking, Pressable, Button } from "react-native";
import { Heading } from "../components/ui/heading";
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
            <Heading style={LoginStyles.title}>Sign Up</Heading>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={LoginStyles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={LoginStyles.input}
                secureTextEntry
            />
            <Pressable
                style={LoginStyles.button}
                onPress={handleSignUp(email, password, setPassword)}
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