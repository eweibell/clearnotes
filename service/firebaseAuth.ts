import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithCredential,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebaseService"
import { Alert } from "react-native"
import { router } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

const googleOAuthRedirectUri = "com.evenweibell.clearnotes:/oauthredirect";
const githubOAuthRedirectUri = "com.evenweibell.clearnotes://oauthredirect";

const handleError = async (error) => {
    if (error?.code === "auth/account-exists-with-different-credential") {
        const email = error?.customData?.email;
        if (!email) {
            console.log("An account already exists with this email using a different sign-in method.")
            Alert.alert(
                "Account Already Exists",
                "An account already exists with this email using a different sign-in method."
            );
            return;
        }
        console.log(`An account for ${email} already exists with a different sign-in method.`)
        Alert.alert(
            "Account Already Exists",
            `An account for ${email} already exists with a different sign-in method.`
        );
        return;
    }
    if (error?.code === "auth/invalid-email") {
        console.log("This email is invalid")
        Alert.alert(
            "Error",
            "This email is invalid"
        );
        return;
    }
    if (error?.code === "auth/invalid-credential") {
        console.log("Email or password is incorrect")
        Alert.alert(
            "Error",
            "Email or password is incorrect"
        );
        return;
    }

    console.log("Firebase Login Error", error?.message ?? "Sign-in failed.")
    Alert.alert("Firebase Login Error", error?.message ?? "Sign-in failed.");
};

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
    console.log("Running handleSignUp");

    if (!password || password.trim().length < 8) {
        Alert.alert("Error", "Password must be at least 8 characters");
        return;
    }
    if (!email) {
        Alert.alert("Error", "Email is not valid");
        return;
    }

    setLoading(true);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        router.replace("/home");

    } catch (error) {
        handleError(error);
    } finally {
        setLoading(false);
    }
};

export const handleLogIn = async (email, password, setLoading) => {
    console.log("Running handleLogIn");
    if (!email?.trim()) {
        Alert.alert("Error", "Email is not valid");
        return;
    }
    if (!password) {
        Alert.alert("Error", "Password is not valid");
        return;
    }


    setLoading(true);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        Alert.alert("Success", "Logged in successfully!");
        router.replace("/home");

    } catch (error) {
        handleError(error);
    } finally {
        setLoading(false);
    }
};

export const useGoogleSignIn = () => {
    console.log("Running useGoogleSignIn");
    const androidClientId =
        __DEV__
          ? Constants.expoConfig.extra.GOOGLE_ANDROID_CLIENT_ID_DEBUG
          : Constants.expoConfig.extra.GOOGLE_ANDROID_CLIENT_ID_RELEASE;
    if (!androidClientId) {
        Alert.alert("Google Login Error", "Missing Google Android client ID. Check your .env values and rebuild the app.");
        return { promptAsync: () => {}, request: null };
    }

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        webClientId: "130009110-6sdbn2d5mr17svcrauiiv7qk7aihkdat.apps.googleusercontent.com",
        androidClientId,
        redirectUri: googleOAuthRedirectUri,
        useProxy: false,
        scopes: ["profile", "email"],
    })
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
                .catch(err => handleError(err));
        }
    }, [response])
    return { promptAsync, request }
}

export const useGithubSignIn = () => {
    console.log("Running useGithubSignIn");
    const githubClientId = Constants.expoConfig?.extra?.GITHUB_CLIENT_ID;

    if (!githubClientId) {
        Alert.alert("GitHub Login Error", "Missing GitHub client ID. Check your .env values and rebuild the app.");
    }

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: githubClientId ?? "",
            redirectUri: githubOAuthRedirectUri,
            responseType: AuthSession.ResponseType.Code,
            scopes: ["read:user", "user:email"],
            usePKCE: false,
        },
        {
            authorizationEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
        }
    );

    useEffect(() => {
        if (!response) return;

        const handleGithubLogin = async () => {
            try {
                if (response.type !== "success") return;

                const code = response.params?.code;
                if (!code) {
                    Alert.alert("GitHub Login Error", "No authorization code returned");
                    return;
                }

                const backendResponse = await fetch(
                  "https://akp96efqcf.execute-api.eu-north-1.amazonaws.com/default/githubSignIn",
                  {
                    method: "POST",
                    body: code,
                  }
                );

                if (!backendResponse.ok) {
                  const errorText = await backendResponse.text();
                  throw new Error(errorText);
                }

                const data = await backendResponse.json();
                const accessToken = data.access_token;

                if (!accessToken) throw new Error("No access token returned from backend");

                const credential = GithubAuthProvider.credential(accessToken);
                await signInWithCredential(auth, credential);

                router.replace("/home");
            } catch (err) {
                handleError(err);
            }
        };

        handleGithubLogin();
    }, [response, request]);

    return { promptAsync, request };
};

export const handleSignOut = async () => {
    console.log("Running handleSignOut")
    try {
        await signOut(auth)
        router.push("/");
    } catch (err) {
        handleError(err);
    }
}
