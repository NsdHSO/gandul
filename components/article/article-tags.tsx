import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

interface ArticleTagsProps {
  tags: string[];
}

export function ArticleTags({ tags }: ArticleTagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      <ThemedText size="sm" weight="semibold" className="mb-2">
        Tags
      </ThemedText>
      <View className="flex-row flex-wrap gap-2">
        {tags.map((tag, index) => (
          <ThemedText
            key={index}
            size="xs"
            className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            #{tag}
          </ThemedText>
        ))}
      </View>
    </View>
  );
}
