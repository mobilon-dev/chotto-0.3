import {sortByTimestamp, formatTimestamp, insertDaySeparators} from '../helpers';

export const transformToFeed = (objects: any[]) => {
  // а. сортировка по timestamp
  const messages1 = sortByTimestamp(objects);

  // б. переформатирование
  const messages2 = messages1.map((m: any) => {
    return {
      ...m,
      position: m.direction === 'outgoing' ? 'right' : 'left',
      time: formatTimestamp(m.timestamp),
    };
  });

  // в. вставка временных отсечек
  const messages3 = insertDaySeparators(messages2);
  return messages3;
}
