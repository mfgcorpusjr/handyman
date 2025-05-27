import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useSQLiteContext } from "expo-sqlite";

import { getLocations } from "@/services/locations";

import { Location } from "@/types";

import colors from "@/constants/colors";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const [locations, setLocations] = useState<Location[]>([]);

  const drawerStatus = useDrawerStatus();

  const db = useSQLiteContext();

  const currentPath = usePathname();

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const handleGetLocations = async () => {
      const data = await getLocations(db);
      setLocations(data);
    };

    if (drawerStatus === "open") {
      handleGetLocations();
    }
  }, [drawerStatus]);

  const handleCustomDrawerItemPress = (path: string) => {
    router.push(path);
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <Image
          style={styles.logo}
          source={require("@assets/images/logo.png")}
          resizeMode="contain"
        />

        <DrawerItemList {...props} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locations</Text>

          <View>
            {locations.map((location) => {
              const path = `/locations/${location.id}`;

              return (
                <DrawerItem
                  key={location.id}
                  label={location.name}
                  focused={path === currentPath}
                  activeTintColor={colors.tint}
                  style={{ borderRadius: 4 }}
                  onPress={() => handleCustomDrawerItemPress(path)}
                />
              );
            })}
          </View>
        </View>
      </DrawerContentScrollView>

      <View style={[styles.footer, { marginBottom: 20 + bottom }]}>
        <Text>&copy; 2025 Handyman</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  section: {
    marginTop: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "grey",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
  },
});
