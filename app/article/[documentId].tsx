import { useLocalSearchParams, Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { useArticle } from '@/lib/hooks/use-article';
import {
  ArticleHeader,
  ArticleMetadata,
  ArticleContent,
  ArticleLinks,
  ArticleTags,
  ArticleLoading,
  ArticleError,
} from '@/components/article';

export default function ArticleDetailScreen() {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const { article, loading, error } = useArticle(documentId || '');

  if (loading) {
    return <ArticleLoading />;
  }

  if (error || !article) {
    return <ArticleError error={error} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: article.title,
          headerShown: true,
        }}
      />
      <ThemedView className="flex-1">
        <ScrollView className="flex-1">
          <ArticleHeader
            featuredImage={article.featuredImage}
            category={article.category}
            publishedDate={article.publishedDate}
          />

          <View className="p-4">
            <ArticleMetadata title={article.title} author={article.author} />
            <ArticleContent description={article.description} content={article.content} />
            <ArticleLinks videoUrl={article.videoUrl} sourceUrl={article.sourceUrl} />
            <ArticleTags tags={article.tags} />
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
