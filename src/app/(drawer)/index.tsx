import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";

import { Location } from "@/types";

import { getLocations } from "@/services/locations";

import LocationForm from "@/components/LocationForm";
import LocationListItem from "@/components/LocationListItem";

export default function ManageLocationsScreen() {
  const [locations, setLocations] = useState<Location[]>();

  const db = useSQLiteContext();

  useEffect(() => {
    handleGetLocations();
  }, []);

  const handleGetLocations = async () => {
    const data = await getLocations(db);
    setLocations(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={{ flex: 1 }}>
        <LocationForm onAdd={handleGetLocations} />

        <FlatList
          data={locations}
          renderItem={({ item }) => (
            <LocationListItem location={item} onDelete={handleGetLocations} />
          )}
          contentContainerStyle={{ gap: 8 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No locations found</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    color: "grey",
    textAlign: "center",
  },
});
