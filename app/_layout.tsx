import { ErrorComponent } from '@/components/ui/error-component';
import { useAuth } from '@/lib/zustand/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import {
  ErrorBoundaryProps,
  SplashScreen,
  Stack,
  useSegments,
} from 'expo-router';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { Toaster } from 'sonner-native';
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <ErrorComponent onPress={retry} title={error.message} />;
}
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
export default function RootLayout() {
  const segment = useSegments();
  const user = useAuth((state) => state.user);
  const isLoggedIn = !!user;
  console.log(segment, isLoggedIn);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    NunitoLight: require('../assets/fonts/NunitoLight.ttf'),
    NunitoRegular: require('../assets/fonts/NunitoRegular.ttf'),
    NunitoBold: require('../assets/fonts/NunitoBold.ttf'),
  });

  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        console.log(error);
      }
    }
    onFetchUpdateAsync();
  }, []);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MenuProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </MenuProvider>
        <Toaster />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
