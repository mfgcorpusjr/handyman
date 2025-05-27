import { useState, useCallback } from "react";
import { StyleSheet, View, Pressable, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useFocusEffect, Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

import TaskListItem from "@/components/TaskListItem";
import ListEmpty from "@/components/ListEmpty";

import { getLocation } from "@/services/locations";
import { getTasksByLocation } from "@/services/tasks";

import { Location, Task } from "@/types";

import colors from "@/constants/colors";

export default function LocationDetails() {
  const [location, setLocation] = useState<Location | null>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const { id } = useLocalSearchParams();

  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      const fetchLocationAndTasks = async () => {
        const location = await getLocation(db, Number(id));
        setLocation(location);

        const tasks = await getTasksByLocation(db, Number(id));
        setTasks(tasks);
      };

      fetchLocationAndTasks();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1 }}>
        <Stack.Screen options={{ title: location?.name }} />

        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskListItem task={item} />}
          ListEmptyComponent={<ListEmpty text="No tasks found" />}
        />

        <Link href={`/locations/${id}/create`} asChild>
          <Pressable style={styles.floatingButton}>
            <Ionicons name="add-outline" size={24} color="white" />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tint,
    position: "absolute",
    bottom: 0,
    right: 20,
  },
});
