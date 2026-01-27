import { Image } from 'expo-image';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useArticles } from '@/lib/hooks/use-articles';
import type { Article } from '@/lib/models/article';

export default function HomeScreen() {
    const { articles, loading, error, refetch } = useArticles();

    const renderArticle = ({ item }: { item: Article }) => (
        <Pressable
            className="mb-4 overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm"
        >
            <View className="relative">
                <Image
                    source={{ uri: item.featuredImage }}
                    style={styles.articleImage}
                    contentFit="cover"
                />
            </View>

            <View className="p-4">
                <ThemedText
                    size="sm"
                    weight="medium"
                    className="mb-2 text-gray-500 dark:text-gray-400"
                >
                    {new Date(item.publishedDate).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </ThemedText>

                <ThemedText
                    size="lg"
                    weight="semibold"
                    leading="snug"
                    className="text-gray-900 dark:text-white"
                >
                    {item.title}
                </ThemedText>
            </View>
        </Pressable>
    );

    if (loading) {
        return (
            <ThemedView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
                <ThemedText size="base" className="mt-4">
                    Loading articles...
                </ThemedText>
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView className="flex-1 items-center justify-center p-4">
                <ThemedText size="lg" weight="semibold" className="mb-2 text-red-600">
                    Error
                </ThemedText>
                <ThemedText size="base" align="center" className="mb-4">
                    {error}
                </ThemedText>
                <Pressable
                    onPress={refetch}
                    className="rounded-lg bg-blue-600 px-6 py-3"
                >
                    <ThemedText size="base" weight="medium" className="text-white">
                        Retry
                    </ThemedText>
                </Pressable>
            </ThemedView>
        );
    }

    return (
        <ThemedView className="flex-1">
            <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={(item, index) => `${item.title}-${index}`}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <ThemedView className="mb-6">
                        <ThemedText type="title" className="mb-2">
                            Gandul.ro
                        </ThemedText>
                        <ThemedText size="base" className="text-gray-600 dark:text-gray-400">
                            Latest News
                        </ThemedText>
                    </ThemedView>
                }
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    articleImage: {
        width: '100%',
        height: 200,
    },
});
