import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { View, TextInput, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function NoteScreen() {
    const [text, setText] = useState("");

    useEffect(() => {
        const loadNote = async () => {
            try {
                const saved = await AsyncStorage.getItem("note")
                if (saved !== null) {
                    setText(saved);
                }
            } catch (e) {
                console.error("Failed to load note", e);
            }
        }

        loadNote()
    }, []);

    useEffect(() => {
        const saveNote = async () => {
            try {
                await AsyncStorage.setItem("note", text);
            } catch (e) {
                console.error("Failed to save note", e)
            }
        }

        saveNote()
    }, [text]);
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#000000" />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Write your note..."
                        multiline
                        style={{
                            flex: 1,
                            width: "100%",
                            textAlignVertical: "top",
                        }}/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}