import { Drawer } from "expo-router/drawer";

import colors from "@/constants/colors";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: "black",
        drawerActiveTintColor: colors.tint,
        drawerItemStyle: {
          borderRadius: 8,
        },
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Manage Locations" }} />
    </Drawer>
  );
}
