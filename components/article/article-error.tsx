import { Stack } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface ArticleErrorProps {
  error?: string;
}

export function ArticleError({ error }: ArticleErrorProps) {
  return (
    <>
      <Stack.Screen options={{ title: 'Error', headerShown: true }} />
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText size="lg" weight="semibold" className="mb-2 text-red-600">
          Error
        </ThemedText>
        <ThemedText size="base" align="center">
          {error || 'Article not found'}
        </ThemedText>
      </ThemedView>
    </>
  );
}
