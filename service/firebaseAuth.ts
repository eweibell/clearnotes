import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "./firebaseService"
import { Alert } from "react-native"
import { router } from "expo-router";
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"

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

export const handleSignOut = async () => {
    console.log("Running handleSignOut")
    try {
        signOut(auth)
        router.push("/");
    } catch (error) {
        Alert.alert("Signout Error", error.message);
    }
}