import { ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export function ArticleLoading() {
  return (
    <>
      <Stack.Screen options={{ title: 'Loading...', headerShown: true }} />
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <ThemedText size="base" className="mt-4">
          Loading article...
        </ThemedText>
      </ThemedView>
    </>
  );
}
