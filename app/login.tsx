import { View, TextInput, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";
import LoginStyles from "../styles/loginStyles.ts"
import { useState, useEffect } from "react"
import { useAuth, handleLogIn, useGoogleSignIn, useGithubSignIn } from "../service/firebaseAuth.ts";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setLoading] = useState(false);
    const { currentUser } = useAuth();

    const { promptAsync: googleSignIn, request: googleRequest } = useGoogleSignIn();
    const { promptAsync: githubSignIn, request: githubRequest } = useGithubSignIn();

    useEffect(() => {
        if (currentUser) {
            router.replace("/home")
        }
    }, [currentUser])

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
            <Text style={LoginStyles.title}>Login</Text>
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
                onPress={() => handleLogIn(email, password, setLoading)}
            >
                <Text style={LoginStyles.buttonText}>Log in</Text>
            </Pressable>
            <Pressable
                style={LoginStyles.button}
                disabled={!googleRequest}
                onPress={() => googleSignIn()}
            >
                <Text style={LoginStyles.buttonText}>Sign in with Google</Text>
            </Pressable>
            <Pressable
                style={LoginStyles.button}
                disabled={!githubRequest}
                onPress={() => githubSignIn()}
            >
                <Text style={LoginStyles.buttonText}>Sign in with Github</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/signup")}>
                <Text>{"Don't have an account? Sign up"}</Text>
            </Pressable>
            {/*<Text onPress={() => router.push("/forgotpass")}>Forgot password</Text>*/}
        </View>
    );
}
