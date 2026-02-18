import { View, TextInput, Text, Linking, Pressable, Button } from "react-native";
import { Heading } from "../components/ui/heading";
import { router } from "expo-router";
import LoginStyles from "../styles/loginStyles";
import { useState } from "react";

export default function Forgotpass() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const handleGetPasswordLink = async () => {
        console.log("getPasswordLink Running")
    }

    return (
        <View style={LoginStyles.container}>
            <Heading style={LoginStyles.title}>Forgot Password</Heading>
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
                onPress={() => router.push("/index")}
            >
                <Text>Return to front page</Text>
            </Pressable>
        </View>
    );
}