import { View } from "react-native";
import { Stack } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function LocationsLayout() {
  return (
    <Stack screenOptions={{ headerTintColor: "black" }}>
      <Stack.Screen
        name="[id]"
        options={{
          headerLeft: ({ tintColor }) => (
            <View style={{ marginLeft: -16 }}>
              <DrawerToggleButton tintColor={tintColor} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[id]/create"
        options={{ headerBackTitle: "Back", title: "Task" }}
      />
    </Stack>
  );
}
