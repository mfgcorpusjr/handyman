import { useState, useCallback } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useFocusEffect, Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

import { getLocation } from "@/services/locations";

import { Location } from "@/types";

import colors from "@/constants/colors";

export default function LocationDetails() {
  const [location, setLocation] = useState<Location | null>();

  const { id } = useLocalSearchParams();

  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      const fetchLocation = async () => {
        const location = await getLocation(db, Number(id));
        setLocation(location);
      };

      fetchLocation();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1 }}>
        <Stack.Screen options={{ title: location?.name }} />

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
