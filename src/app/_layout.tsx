import { useEffect, Suspense } from "react";
import { Slot, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SQLiteProvider } from "expo-sqlite";
import * as Notifications from "expo-notifications";

import { migrateDbIfNeeded } from "@/utils/db";
import { initNotifications } from "@/utils/notifications";

import Fallback from "@/components/Fallback";

initNotifications();

export default function RootLayout() {
  useEffect(() => {
    const askNotificationsPermissionAsync = async () => {
      await Notifications.requestPermissionsAsync();
    };

    askNotificationsPermissionAsync();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { locationId, taskId } =
          response.notification.request.content.data;
        router.push(`/locations/${locationId}/create?taskId=${taskId}`);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Suspense fallback={<Fallback />}>
          <SQLiteProvider
            databaseName="handyman.db"
            onInit={migrateDbIfNeeded}
            useSuspense
          >
            <Slot />
          </SQLiteProvider>
        </Suspense>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
