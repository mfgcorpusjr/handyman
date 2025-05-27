import { Suspense } from "react";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SQLiteProvider } from "expo-sqlite";

import { migrateDbIfNeeded } from "@/utils/db";

import Fallback from "@/components/Fallback";

export default function RootLayout() {
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
