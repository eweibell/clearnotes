import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithCredential,
    GoogleAuthProvider
} from "firebase/auth";
import { auth } from "./firebaseService"
import { Alert } from "react-native"
import { router } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Constants from "expo-constants";

const providerGoogle = new GoogleAuthProvider();

export const useAuth = () => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    return { currentUser: user, loading };
};

export const handleSignUp = async (email, password, setLoading) => {
    console.log("Running handleSignUp")
    if (!password) {
        Alert.alert("Error", "Password is not valid")
        return;
    }
    if (!email) {
        Alert.alert("Error", "Email is not valid")
        return;
    }

    setLoading(true);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User created");
        Alert.alert("Success", "Account created successfully!");
        router.push("/home");
    } catch (error) {
        Alert.alert("Signup Error", error.message);
    } finally {
        setLoading(false);
    }
};

export const handleLogIn = async (email, password, setLoading) => {
    console.log("Running handleLogIn")
    if (!password) {
        Alert.alert("Error", "Password is not valid")
        return;
    }
    if (!email) {
        Alert.alert("Error", "Email is not valid")
        return;
    }

    setLoading(true);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User logged in");
        Alert.alert("Success", "Logged in successfully!");
        router.push("/home");
    } catch (error) {
        Alert.alert("Login Error", error.message);
    } finally {
        setLoading(false);
    }
}

export const useGoogleSignIn = () => {
    const redirectUri = "com.evenweibell.clearnotes:/oauthredirect";
    const androidClientId = __DEV__
        ? Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID_DEBUG
        : Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID_RELEASE;
    if (!androidClientId) {
        Alert.alert(
            "Google Login Error",
            "Missing Google Android client ID. Check your .env values and rebuild the app."
        );
    }
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        webClientId: "130009110-6sdbn2d5mr17svcrauiiv7qk7aihkdat.apps.googleusercontent.com",
        androidClientId,
        redirectUri,
        useProxy: false,
        scopes: ["profile", "email"],
    })
    console.log(redirectUri)
    console.log("Android Client ID: " + androidClientId)

    console.log(request?.url);
    console.log(response?.type, response?.error);

    useEffect(() => {
        if (!response) return

        if (response.type === "success") {
            const idToken = response.authentication?.idToken ?? response.params?.id_token
            if (!idToken) {
                Alert.alert("Google Login Error", "No ID token returned")
                return
            }
            const credential = GoogleAuthProvider.credential(idToken)
            signInWithCredential(auth, credential)
                .then(() => router.replace("/home"))
                .catch(err => Alert.alert("Firebase Login Error", err.message))
        }
    }, [response])

    return { promptAsync, request }
}

export const handleSignOut = async () => {
    console.log("Running handleSignOut")
    try {
        signOut(auth)
        router.push("/");
    } catch (error) {
        Alert.alert("Signout Error", error.message);
    }
}
