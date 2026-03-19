import { StyleSheet } from 'react-native'

const ToolbarButtonStyles = StyleSheet.create({
  button: {
    minWidth: 48,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e2e8f0",
  },
  buttonActive: {
    backgroundColor: "#0f172a",
  },
  buttonDisabled: {
    backgroundColor: "#eef2f7",
  },
  buttonText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "700",
  },
  buttonTextActive: {
    color: "#f8fafc",
  },
  buttonTextDisabled: {
    color: "#94a3b8",
  }
});

export default ToolbarButtonStyles;