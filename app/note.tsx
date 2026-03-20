import { useMemo, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  EnrichedTextInput,
  type EnrichedTextInputInstance,
  type OnChangeStateEvent,
} from "react-native-enriched";
import ToolbarButton from "@/components/toolBarButton";
import { loadNote, saveNote } from "@/services/noteStorage";

type ToolbarItem = {
  key: keyof Pick<
    OnChangeStateEvent,
    | "bold"
    | "italic"
    | "underline"
    | "strikeThrough"
    | "inlineCode"
    | "h1"
    | "h2"
    | "blockQuote"
    | "orderedList"
    | "unorderedList"
    | "checkboxList"
  >;
  label: string;
  onPress: () => void;
};

export default function NoteEditorScreen() {
  const router = useRouter();
  const editorRef = useRef<EnrichedTextInputInstance>(null);

  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [plainTextContent, setPlainTextContent] = useState("");
  const [styleState, setStyleState] = useState<OnChangeStateEvent | null>(null);

  const toolbarItems = useMemo<ToolbarItem[]>(
    () => [
      {
        key: "bold",
        label: "B",
        onPress: () => editorRef.current?.toggleBold(),
      },
      {
        key: "italic",
        label: "I",
        onPress: () => editorRef.current?.toggleItalic(),
      },
      {
        key: "underline",
        label: "U",
        onPress: () => editorRef.current?.toggleUnderline(),
      },
      {
        key: "strikeThrough",
        label: "S",
        onPress: () => editorRef.current?.toggleStrikeThrough(),
      },
      {
        key: "inlineCode",
        label: "</>",
        onPress: () => editorRef.current?.toggleInlineCode(),
      },
      {
        key: "h1",
        label: "H1",
        onPress: () => editorRef.current?.toggleH1(),
      },
      {
        key: "h2",
        label: "H2",
        onPress: () => editorRef.current?.toggleH2(),
      },
      {
        key: "blockQuote",
        label: "Quote",
        onPress: () => editorRef.current?.toggleBlockQuote(),
      },
      {
        key: "orderedList",
        label: "1.",
        onPress: () => editorRef.current?.toggleOrderedList(),
      },
      {
        key: "unorderedList",
        label: "•",
        onPress: () => editorRef.current?.toggleUnorderedList(),
      },
      {
        key: "checkboxList",
        label: "[]",
        onPress: () => editorRef.current?.toggleCheckboxList(false),
      },
    ],
    []
  );

  const handleBack = () => {
    Keyboard.dismiss();
    router.back();
  };

  const handleSave = () => {
    Keyboard.dismiss();
    Alert.alert(
      "Note saved",
      `${title.trim() || "Untitled"}\n${plainTextContent.trim().length} characters`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={handleBack}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Back</Text>
          </Pressable>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Note title"
            placeholderTextColor="#94a3b8"
            returnKeyType="done"
            style={styles.titleInput}
          />

          <Pressable
            accessibilityLabel="Save note"
            accessibilityRole="button"
            onPress={handleSave}
            style={[styles.headerButton, styles.saveButton]}
          >
            <Text style={[styles.headerButtonText, styles.saveButtonText]}>
              Save
            </Text>
          </Pressable>
        </View>

        <View style={styles.editorCard}>
          <Text style={styles.editorHint}>Start writing</Text>

          <EnrichedTextInput
            ref={editorRef}
            autoFocus
            placeholder="Capture ideas, meeting notes, or a quick draft..."
            placeholderTextColor="#94a3b8"
            scrollEnabled
            style={styles.editor}
            onChangeHtml={(e) => setHtmlContent(e.nativeEvent.value)}
            onChangeText={(e) => setPlainTextContent(e.nativeEvent.value)}
            onChangeState={(e) => setStyleState(e.nativeEvent)}
            htmlStyle={{
              h1: {
                fontSize: 30,
                bold: true,
              },
              h2: {
                fontSize: 24,
                bold: true,
              },
              blockquote: {
                color: "#475569",
                borderColor: "#cbd5e1",
                borderWidth: 3,
                gapWidth: 12,
              },
              code: {
                color: "#0f172a",
                backgroundColor: "#e2e8f0",
              },
              ol: {
                markerColor: "#0f172a",
                markerFontWeight: "700",
                marginLeft: 20,
                gapWidth: 10,
              },
              ul: {
                bulletColor: "#0f172a",
                bulletSize: 6,
                marginLeft: 20,
                gapWidth: 10,
              },
              ulCheckbox: {
                boxColor: "#0f172a",
                boxSize: 16,
                marginLeft: 20,
                gapWidth: 10,
              },
            }}
          />
        </View>

        <View style={styles.toolbarShell}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.toolbarContent}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
          >
            {toolbarItems.map((item) => {
              const itemState = styleState?.[item.key];

              return (
                <ToolbarButton
                  key={item.key}
                  active={itemState?.isActive}
                  disabled={itemState?.isBlocking}
                  label={item.label}
                  onPress={item.onPress}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.footerMeta}>
          <Text style={styles.footerMetaText}>
            {plainTextContent.trim().length} chars
          </Text>
          <Text numberOfLines={1} style={styles.footerMetaText}>
            {htmlContent ? "HTML synced" : "No content yet"}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e2e8f0",
  },
  headerButtonText: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#0f172a",
  },
  saveButtonText: {
    color: "#f8fafc",
  },
  titleInput: {
    flex: 1,
    minHeight: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
  },
  editorCard: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 4,
  },
  editorHint: {
    marginBottom: 8,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  editor: {
    flex: 1,
    minHeight: 240,
    color: "#0f172a",
    fontSize: 18,
    lineHeight: 28,
    paddingBottom: 12,
  },
  toolbarShell: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dbe4ee",
    backgroundColor: "#f8fafc",
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 6 : 10,
  },
  toolbarContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  footerMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  footerMetaText: {
    flex: 1,
    color: "#64748b",
    fontSize: 12,
  },
});
