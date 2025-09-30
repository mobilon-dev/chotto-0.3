export const statuses: string[] = ['read', 'received', 'sent']

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
