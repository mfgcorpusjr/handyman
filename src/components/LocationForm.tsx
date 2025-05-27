import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import { addLocation } from "@/services/locations";

import AppTextInput from "@/components/ui/AppTextInput";
import AppButton from "@/components/ui/AppButton";

type LocationFormProps = {
  onAdd: () => void;
};

export default function LocationForm({ onAdd }: LocationFormProps) {
  const [location, setLocation] = useState("");

  const db = useSQLiteContext();

  const handleAddLocation = async () => {
    await addLocation(db, location);
    setLocation("");
    onAdd();
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        style={{ flex: 1 }}
        value={location}
        onChangeText={setLocation}
        placeholder="E.g. School"
      />
      <AppButton
        text="Add Location"
        disabled={!location.trim()}
        onPress={handleAddLocation}
      />
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
