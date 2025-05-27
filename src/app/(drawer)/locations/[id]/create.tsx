import { useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppTextInput from "@/components/ui/AppTextInput";
import AppButton from "@/components/ui/AppButton";

import colors from "@/constants/colors";

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.container}>
        <AppTextInput
          value={title}
          onChangeText={setTitle}
          placeholder="E.g. Study Physics"
        />

        <AppTextInput
          style={styles.description}
          value={description}
          onChangeText={setDescription}
          placeholder="E.g. Review Newton's laws and solve practice problems on motion and forces."
          multiline
        />

        <View style={styles.urgentContainer}>
          <Text style={styles.label}>Urgent</Text>

          <Switch
            value={isUrgent}
            onValueChange={setIsUrgent}
            trackColor={{ true: colors.tint }}
          />
        </View>

        <AppButton text="Update Task" style={styles.updateTaskButton} />
        <AppButton text="Finish Task" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 20,
  },
  description: {
    height: 100,
  },
  urgentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
  updateTaskButton: {
    backgroundColor: colors.tint,
  },
});
