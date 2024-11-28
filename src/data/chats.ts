export const chats = [
  {
    chatId: 1, name: "Василий ВасилийВасилийВасилий Василий",
    avatar: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg',
    countUnread: 102,
    lastMessage: 'test',
    'lastActivity.time': 'час назад',    // читаемый формат - для пользователей
    'lastActivity.timestamp': '1727001759',   // для сортировки
    isFixedBottom: false,
    status: "#767676",
    'lastMessage.status': 'read',
    actions: [
      { action: 'add', title: 'добавить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=add' },
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить', icon: 'https://placehold.jp/30/dd6699/ffffff/64x64.png?text=del' },
    ],
    typing: true,
    filterMetadata: '',    // фильтр работает по name и данным в filterMetadata
  },
  {
    chatId: 2, name: "Мария",
    countUnread: 0, isFixedTop: true,
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727027359',
    'lastMessage.status': 'received',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'unpin', title: 'открепить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 3, name: "Анна",
    countUnread: 0, isFixedBottom: true,
    'lastMessage.status': 'se',
    'lastActivity.timestamp': '1727027359',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'unpin', title: 'открепить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 4, name: "Василий", countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад', statusMessage: 'received', isFixed: false, status: "#00b972", actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 5, name: "Василий 33",
    countUnread: 0, lastMessage: 'test',
    'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727027259',
    'lastMessage.status': 'send',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 6, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727023159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 7, name: "Василий 2",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    typing: true,
    filterMetadata: '',
  },
  {
    chatId: 8, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 9, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    metadata: 'Данияр',
  },
  {
    chatId: 10, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 11, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    filterMetadata: '',
  },
  {
    chatId: 12, name: "Василий",
    countUnread: 0, lastMessage: 'test', 'lastActivity.time': 'час назад',
    'lastActivity.timestamp': '1727021159',
    actions: [
      { action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' },
    ],
    filterMetadata: '',
  },
];
