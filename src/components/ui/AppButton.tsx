import { StyleSheet, Pressable, Text, PressableProps } from "react-native";

type AppButtonProps = {
  text: string;
} & PressableProps;

export default function AppButton({ text, ...rest }: AppButtonProps) {
  return (
    <Pressable
      {...rest}
      style={[styles.container, rest.disabled && styles.disabledContainer]}
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
