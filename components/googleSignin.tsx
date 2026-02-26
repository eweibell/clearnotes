import React, { useState } from 'react';
import { View, Alert, Pressable, Text, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { handleGoogleSignIn } from '../service/firebaseAuth';

// Ensure that the native modules are available
WebBrowser.maybeCompleteAuthSession();

// Configure your Google OAuth app settings
const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
const redirectUrl = AuthSession.getRedirectUrl();

const GoogleSignInComponent = () => {
  const [isInProgress, setIsInProgress] = useState(false);

  const signIn = async () => {
    if (!GOOGLE_CLIENT_ID) {
      Alert.alert('Configuration Error', 'Google Client ID is not configured');
      return;
    }

    try {
      setIsInProgress(true);

      // Create authorization URL
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=id_token&scope=openid%20profile%20email`;

      // Start authentication flow
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

      if (result.type === 'success') {
        const params = new URLSearchParams(result.url.split('#')[1]);
        const idToken = params.get('id_token');
        const accessToken = params.get('access_token');

        if (idToken) {
          // Decode ID token to get user info
          const tokenPayload = JSON.parse(
            Buffer.from(idToken.split('.')[1], 'base64').toString()
          );

          const userInfo = {
            idToken,
            accessToken,
            user: {
              email: tokenPayload.email,
              name: tokenPayload.name,
            },
          };

          console.log('User Info:', userInfo);

          // Pass the userInfo to Firebase handler
          await handleGoogleSignIn(userInfo);
        }
      } else if (result.type === 'cancel') {
        console.log('User cancelled sign in');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Sign In Error', error.message || 'An error occurred during sign in');
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <View style={{ marginVertical: 16 }}>
      <Pressable
        onPress={signIn}
        disabled={isInProgress}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: '#1f2937',
          borderRadius: 8,
          alignItems: 'center',
          opacity: isInProgress ? 0.6 : 1,
        }}
      >
        {isInProgress ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>
            Sign in with Google
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default GoogleSignInComponent;