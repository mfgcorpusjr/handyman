import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSQLiteContext } from "expo-sqlite";

import { deleteLocation } from "@/services/locations";

import { Location } from "@/types";

type LocationListItemProps = {
  location: Location;
  onDelete: () => void;
};

export default function LocationListItem({
  location,
  onDelete,
}: LocationListItemProps) {
  const db = useSQLiteContext();

  const handleDeleteLocation = async () => {
    deleteLocation(db, location.id);
    onDelete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{location.name}</Text>
      <Ionicons
        name="trash-outline"
        size={24}
        color="crimson"
        onPress={handleDeleteLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  text: {
    fontSize: 16,
  },
});
