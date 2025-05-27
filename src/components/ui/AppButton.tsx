import { StyleSheet, Pressable, Text, PressableProps } from "react-native";

type AppButtonProps = {
  text: string;
} & PressableProps;

export default function AppButton({ text }: AppButtonProps) {
  return (
    <Pressable style={styles.container}>
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
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
