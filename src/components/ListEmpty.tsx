import { StyleSheet, View, Text } from "react-native";

type ListEmptyProps = {
  text?: string;
};

export default function ListEmpty({ text = "No items found" }: ListEmptyProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  text: {
    color: "grey",
  },
});
