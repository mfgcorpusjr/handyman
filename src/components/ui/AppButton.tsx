import {
  StyleSheet,
  Pressable,
  Text,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

type AppButtonProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export default function AppButton({ text, style, ...rest }: AppButtonProps) {
  return (
    <Pressable
      {...rest}
      style={[
        styles.container,
        style,
        rest.disabled && styles.disabledContainer,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledContainer: {
    backgroundColor: "darkgrey",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
