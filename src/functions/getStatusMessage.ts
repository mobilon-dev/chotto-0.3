export const statuses: string[] = ['read', 'received', 'sent']

/**
 * Преобразует статус сообщения в соответствующий CSS-класс для стилизации
 * 
 * @param status - Статус сообщения ('read', 'received', 'sent' или другое значение)
 * @returns CSS-класс для статуса ('status--read', 'status--received') или пустую строку для остальных случаев
 * 
 * @example
 * getStatus('read') // returns 'status--read'
 * getStatus('received') // returns 'status--received'
 * getStatus('sent') // returns ''
 * getStatus('unknown') // returns ''
 */
export const getStatus = (status: string): string => {
  switch (status) {
    case 'read':
      return 'status--read'
    case 'received':
      return 'status--received'
    default:
      return ''
  }
}
