import { View, Linking } from 'react-native';
import { ThemedText } from '@/components/themed-text';

interface ArticleLinksProps {
  videoUrl?: string;
  sourceUrl?: string;
}

export function ArticleLinks({ videoUrl, sourceUrl }: ArticleLinksProps) {
  if (!videoUrl && !sourceUrl) {
    return null;
  }

  return (
    <>
      {videoUrl && (
        <View className="mb-6">
          <ThemedText size="sm" weight="semibold" className="mb-2">
            Video
          </ThemedText>
          <ThemedText
            size="sm"
            className="text-blue-600 dark:text-blue-400"
            onPress={() => Linking.openURL(videoUrl)}
          >
            Watch Video
          </ThemedText>
        </View>
      )}

      {sourceUrl && (
        <View className="mb-6">
          <ThemedText size="sm" weight="semibold" className="mb-2">
            Source
          </ThemedText>
          <ThemedText
            size="sm"
            className="text-blue-600 dark:text-blue-400"
            onPress={() => Linking.openURL(sourceUrl)}
          >
            View Original Article
          </ThemedText>
        </View>
      )}
    </>
  );
}
