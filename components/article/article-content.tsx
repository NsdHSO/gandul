import { ThemedText } from '@/components/themed-text';

interface ArticleContentProps {
  description?: string;
  content?: string;
}

export function ArticleContent({ description, content }: ArticleContentProps) {
  return (
    <>
      {description && (
        <ThemedText
          size="lg"
          leading="relaxed"
          className="mb-6 text-gray-700 dark:text-gray-300"
        >
          {description}
        </ThemedText>
      )}

      {content && (
        <ThemedText
          size="base"
          leading="relaxed"
          className="mb-6 text-gray-800 dark:text-gray-200"
        >
          {content}
        </ThemedText>
      )}
    </>
  );
}
