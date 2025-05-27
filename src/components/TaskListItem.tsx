import { StyleSheet, Pressable, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

import { Task } from "@/types";

import colors from "@/constants/colors";

type TaskListItemProps = {
  task: Task;
};
export default function TaskListItem({ task }: TaskListItemProps) {
  return (
    <Link
      href={`/locations/${task.location_id}/create?taskId=${task.id}`}
      asChild
    >
      <Pressable style={styles.container}>
        <Ionicons
          name={task.is_urgent ? "warning-outline" : "ellipse-outline"}
          size={28}
          color={task.is_urgent ? colors.tint : "black"}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    gap: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    color: "grey",
  },
});
