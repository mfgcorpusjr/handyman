import { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, Stack, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

import { getLocation } from "@/services/locations";

import { Location } from "@/types";

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
    <View style={styles.container}>
      <Stack.Screen options={{ title: location?.name }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
