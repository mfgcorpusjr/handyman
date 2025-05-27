import { Drawer } from "expo-router/drawer";

import DrawerContent from "@/components/DrawerContent";

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
          borderRadius: 4,
        },
      }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="index" options={{ title: "Manage Locations" }} />
      <Drawer.Screen
        name="locations"
        options={{ drawerItemStyle: { display: "none" }, headerShown: false }}
      />
    </Drawer>
  );
}
