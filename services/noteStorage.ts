import AsyncStorage from '@react-native-async-storage/async-storage'

export async function loadNote(): Promise<string | null> {
    try {
        return await AsyncStorage.getItem('note')
    } catch (e) {
        console.error("Failed to load note", e);
        return null
    }
}

export async function saveNote(text: string) {
    try {
        await AsyncStorage.setItem('note', text);
    } catch (e) {
        console.error("Failed to save note", e)
    }
}