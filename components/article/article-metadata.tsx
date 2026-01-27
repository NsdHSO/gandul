import { ThemedText } from '@/components/themed-text';

interface ArticleMetadataProps {
  title: string;
  author?: string;
}

export function ArticleMetadata({ title, author }: ArticleMetadataProps) {
  return (
    <>
      <ThemedText type="title" className="mb-4">
        {title}
      </ThemedText>

      {author && (
        <ThemedText size="sm" weight="medium" className="mb-4 text-gray-600 dark:text-gray-400">
          By {author}
        </ThemedText>
      )}
    </>
  );
}
