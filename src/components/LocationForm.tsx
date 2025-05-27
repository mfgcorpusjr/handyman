import { StyleSheet, View } from "react-native";

import AppTextInput from "@/components/ui/AppTextInput";
import AppButton from "@/components/ui/AppButton";

export default function LocationForm() {
  return (
    <View style={styles.container}>
      <AppTextInput style={{ flex: 1 }} placeholder="E.g. School" />
      <AppButton text="Add Location" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
});
