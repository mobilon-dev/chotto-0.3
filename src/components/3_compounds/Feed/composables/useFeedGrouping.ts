import { ComputedRef, computed } from 'vue';
import { IFeedObject } from '@/types';

interface UseFeedGroupingOptions {
  objects: ComputedRef<IFeedObject[]>;
  isNewMessage: (index: number) => boolean;
}

/**
 * Композабл для группировки сообщений в серии (по отправителю)
 */
export function useFeedGrouping({ objects, isNewMessage }: UseFeedGroupingOptions) {
  /**
   * Группирует сообщения, определяя начало серии и новые сообщения
   */
  const groupedObjects = computed(() => {
    if (!objects.value || objects.value.length === 0) return [];

    return objects.value.map((message, index, arr) => {
      // Проверяем, от того же отправителя ли предыдущее сообщение
      const isSameSenderAsPrevious =
        index > 0 &&
        arr[index - 1].position === message.position &&
        arr[index - 1].header === message.header;

      // Проверяем, можно ли группировать предыдущее сообщение
      const prevIsGroupable =
        index > 0 &&
        !['message.system', 'message.typing'].includes(arr[index - 1].type);

      // Определяем, является ли это первым сообщением в серии
      const isFirstInSeries = !isSameSenderAsPrevious || !prevIsGroupable;

      return {
        ...message,
        isFirstInSeries,
        isNewMessage: isNewMessage(index),
      };
    });
  });

  return {
    groupedObjects,
  };
}

