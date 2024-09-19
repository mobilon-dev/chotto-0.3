export interface IChat {
  name: string;
  lastMessage: string;
  countUnread: number;
  'lastActivity.time': string;
}
