import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSQLiteContext } from "expo-sqlite";
import { useLocalSearchParams, router } from "expo-router";

import AppTextInput from "@/components/ui/AppTextInput";
import AppButton from "@/components/ui/AppButton";

import { getTask, addTask, updateTask, deleteTask } from "@/services/tasks";

import colors from "@/constants/colors";

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const { id: locationId, taskId } = useLocalSearchParams();

  const db = useSQLiteContext();

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTask(db, Number(taskId));
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setIsUrgent(!!task.is_urgent);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleAddUpdateTask = () => {
    const task = {
      location_id: Number(locationId),
      title,
      description,
      image_uri: null,
      is_urgent: isUrgent ? 1 : 0,
    };

    if (taskId) {
      updateTask(db, { ...task, id: Number(taskId) });
    } else {
      addTask(db, task);
    }

    router.dismissTo(`/locations/${locationId}`);
  };

  const handleFinishTask = () => {
    Alert.alert(
      "Finish Task",
      "Are you sure you want to finish this task? It will be removed from the database.",
      [
        { text: "Cancel" },
        {
          text: "Finish",
          style: "destructive",
          onPress: () => {
            deleteTask(db, Number(taskId));
            router.dismissTo(`/locations/${locationId}`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView contentContainerStyle={styles.container}>
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

          <AppButton
            text={taskId ? "Update Task" : "Add Task"}
            style={styles.addUpdateTaskButton}
            disabled={!title.trim()}
            onPress={handleAddUpdateTask}
          />
          {taskId && (
            <AppButton
              text="Finish Task"
              onPress={handleFinishTask}
              disabled={!title.trim()}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 8,
    gap: 20,
  },
  description: {
    height: 200,
  },
  urgentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
  addUpdateTaskButton: {
    backgroundColor: colors.tint,
  },
});
