import { loadNote, saveNote } from "../services/noteStorage"
import { useState, useEffect } from "react";
import { View, TextInput, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function NoteScreen() {
    const [text, setText] = useState("");

    useEffect(() => {
        (async () => {
            const saved = await loadNote();
            if (saved !== null) {
                setText(saved);
            }
        })()
    }, []);

    useEffect(() => {
        saveNote(text)
    }, [text]);
    
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
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