import { StyleSheet, View } from "react-native";

import LocationForm from "@/components/LocationForm";
import LocationListItem from "@/components/LocationListItem";

export default function ManageLocationsScreen() {
  return (
    <View style={styles.container}>
      <LocationForm />

      <LocationListItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
