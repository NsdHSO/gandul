import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';

interface ArticleHeaderProps {
  featuredImage?: string;
  category?: string;
  publishedDate: string;
}

export function ArticleHeader({ featuredImage, category, publishedDate }: ArticleHeaderProps) {
  return (
    <>
      {featuredImage && (
        <Image
          source={{ uri: featuredImage }}
          style={styles.featuredImage}
          contentFit="cover"
        />
      )}

      <View className="m-2 flex-row items-center justify-between">
        {category && (
          <ThemedText
            size="xs"
            weight="semibold"
            uppercase
            className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          >
            {category}
          </ThemedText>
        )}
        <ThemedText size="sm" className="text-gray-500 dark:text-gray-400">
          {new Date(publishedDate).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </ThemedText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  featuredImage: {
    width: '100%',
    height: 250,
  },
});
