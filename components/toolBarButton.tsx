import { Pressable, Text } from "react-native";
import ToolbarButtonStyles from "../styles/toolbarButtonStyles";

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

function ToolbarButton({
  active = false,
  disabled = false,
  label,
  onPress,
}: ToolbarButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: active }}
      disabled={disabled}
      onPress={onPress}
      style={[
        ToolbarButtonStyles.button,
        active && ToolbarButtonStyles.buttonActive,
        disabled && ToolbarButtonStyles.buttonDisabled,
      ]}
    >
      <Text
        style={[
          ToolbarButtonStyles.buttonText,
          active && ToolbarButtonStyles.buttonTextActive,
          disabled && ToolbarButtonStyles.buttonTextDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default ToolbarButton;