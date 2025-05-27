import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function LocationDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
