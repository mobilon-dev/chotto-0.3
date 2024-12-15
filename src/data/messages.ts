export const messages = [
  {
    chatId: 1, type: "message.call", direction: 'incoming',
    callDuration: "18 мин", isMissedCall: false, timestamp: '1727027959',
    avatar: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg', subText: '89829445678',
    transcript: {
      dialog: [
        {
          time: '00:00',
          text: 'привет, Вася',
          position: 'right',
        },
        {
          time: '00:05',
          text: 'привет, Петя',
          position: 'left',
        },
        {
          time: '00:10',
          text: 'как дела?',
          position: 'right',
        },
        {
          time: '00:15',
          text: 'все норм',
          position: 'left',
        },
      ],
    },
  },
  {
    chatId: 1, type: "message.text", text: "Привет!", direction: 'incoming', status: 'read', timestamp: '1727027959', subText: 'test test',
    actions: [
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    chatId: 1, type: "message.typing", subText: '89829445678', avatar: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
  },
  {
    chatId: 1, type: "message.text", text: "Привет! Сообщение с просмотрами",
    direction: 'outgoing', status: 'received', timestamp: '1727027959',
    views: 1000,
    actions: [
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    chatId: 1, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", timestamp: '1727027959',
    alt: "Example Image", direction: 'outgoing',
    views: 1667,
    status: 'received', actions: [
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    chatId: 2, type: "message.video", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", direction: 'outgoing', status: 'read', timestamp: '1727027959',
    actions: [
      { action: 'edit', title: 'изменить', icon: 'fa-edit' },
      { action: 'delete', title: 'удалить' }]
  },
  {
    chatId: 2, type: "message.video", url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
    direction: 'outgoing', status: 'read', timestamp: '1727027959',
  },
  {
    chatId: 2,
    messageId: 1,
    timestamp: '1731411505',
    type: "message.system", text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    chatId: 1, messageId: 1,
    timestamp: 1731411505,
    type: "message.system", text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    chatId: 2, type: "message.file", url: "https://axiomabio.com/pdf/test.pdf", filename: "Документ.pdf", direction: 'incoming',
    status: 'received', timestamp: '1727027959', actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }]
  },
  { chatId: 2, type: "message.text", text: "Привет!", direction: 'incoming', status: 'read', timestamp: '1727027959' },
  {
    chatId: 2, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", direction: 'incoming', status: 'received', subText: '89829445678', timestamp: '1727027959',
    transcript: {
      text: 'Привет, доехала хорошо, позвони мне завтра',
    },
    actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }]
  },
  {
    chatId: 2, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", direction: 'outgoing', status: 'received', subText: '89829445678', timestamp: '1727027959',
    actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }]
  },
  {
    chatId: 2, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
    direction: 'incoming', subText: '89829445678', timestamp: '1726743559',
  },
  {
    chatId: 3, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    text: "Привет!", direction: 'incoming', status: 'read', timestamp: '1727027959'
  },
  {
    chatId: 3, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
    direction: 'outgoing', timestamp: '1726743559',
  },
  {
    chatId: 4, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    direction: 'incoming', status: 'read', timestamp: '1727027959',
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
  },
  {
    chatId: 4, type: "message.audio", url: "https://file-examples.com/storage/fe40e015d566f1504935cfd/2017/11/file_example_MP3_700KB.mp3",
    direction: 'outgoing', status: 'read', timestamp: '1727027959',
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
    transcript: {
      text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
    }
  },
  {
    chatId: 4, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
    direction: 'outgoing', timestamp: '1726743559',
  },
  { chatId: 4, type: "message.text", text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!", direction: 'incoming', status: 'read', timestamp: '1727027959' },
  { chatId: 4, type: "message.text", text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!", direction: 'outgoing', status: 'read', timestamp: '1727027958' },
  {
    chatId: 4, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
    direction: 'outgoing', timestamp: '1726743549', text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",
  },
  {
    chatId: 4, type: "message.image", url: "https://nationaltoday.com/wp-content/uploads/2022/05/Sun-Day--1200x834.jpg", alt: "Example Image",
    direction: 'incoming', timestamp: '1726743539', text: "Очень длинное сообщение без пробелов занимающее сразу несколько строк и вызывающее странное поведение окон!",
  },
  {
    chatId: 4, type: "message.video", url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
    direction: 'incoming', status: 'read', timestamp: '1727027959',
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",

  },
  {
    chatId: 4, type: "message.video", url: "https://filebump2.services.mobilon.ru/file/i3UQnryC89WwxtigxSUXWq0ltJBhLfJXp5hT",
    direction: 'outgoing', status: 'read', timestamp: '1727027959',
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",

  },
  {
    chatId: 4, type: "message.file", url: "https://axiomabio.com/pdf/test.pdf", filename: "оченьдлинноеназваниедокумента.pdf", direction: 'outgoing',
    status: 'received', timestamp: '1727027959', actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }],
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",

  },
  {
    chatId: 4, type: "message.file", url: "https://axiomabio.com/pdf/test.pdf", filename: "Документ.pdf", direction: 'incoming',
    status: 'received', timestamp: '1727027959', actions: [{ action: 'edit', title: 'изменить' }, { action: 'delete', title: 'удалить' }],
    text: "Оченьдлинноесообщениебезпробеловзанимающеесразунесколькострокивызывающеестранноеповедениеокон!",

  },
  {
    chatId: 1, type: "message.text", text: "Привет! Извини, давно тебе не писал. Как дела?",
    direction: 'outgoing', status: 'received', timestamp: '1727027959',
    actions: [
      { action: 'edit', title: 'изменить', icon: 'https://placehold.jp/30/336633/ffffff/64x64.png?text=pin' },
      { action: 'delete', title: 'удалить' }
    ],
    reply: {
      type: 'message.text',
      text: 'Привет, что-то давно не пишешь?',
    },
  },
  {
    chatId: 1, type: "message.text", text: "классное фото, тоже таки хочу",
    direction: 'outgoing', status: 'received', timestamp: '1727027959',
    reply: {
      messageId: 'msg_3450349543',
      type: 'message.image',
      text: 'мои новые кроссовки',
      url: 'https://placehold.jp/30/336633/ffffff/320x160.png?text=кроссовки',
    },
  },
];
