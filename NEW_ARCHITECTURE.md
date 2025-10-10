# Схема компонентов проекта Chotto

Проект построен по принципам **Atomic Design** с числовой иерархией сложности компонентов:

```
📁 src/
├── 🎯 apps/                    # Готовые приложения-примеры
│   ├── BaseBaseChatApp/        # Базовое чат-приложение
│   ├── BaseExtendedChatApp/   # Расширенное чат-приложение  
│   ├── BaseAdaptiveExtendedChatApp/ # Адаптивное расширенное
│   ├── BaseFeedChatApp/       # Приложение с лентой сообщений
│   ├── FloatExtendedChatApp/  # Плавающее расширенное приложение
│   ├── MobilonExtendedChatApp/ # Мобильная версия
│   ├── data/                  # Тестовые данные для демо
│   ├── helpers/               # Вспомогательные функции приложений
│   ├── stores/                # Pinia store для состояния
│   └── transform/             # Трансформации данных
│
├── 🧩 components/             # Библиотека компонентов (Atomic Design)
│   ├── 1_atoms/               # Атомы - базовые элементы
│   │   ├── ButtonContextMenu/ # Кнопка контекстного меню
│   │   ├── ContextMenu/       # Контекстное меню
│   │   ├── EmbedPreview/      # Предпросмотр встроенного контента
│   │   ├── LinkPreview/       # Предпросмотр ссылок
│   │   └── Tooltip/           # Всплывающие подсказки
│   │
│   ├── 1_icons/               # Иконки (отдельная категория)
│   │   ├── AvatarIcon/        # Иконка аватара
│   │   ├── CheckIcon/         # Иконка галочки
│   │   ├── CloseButtonIcon/   # Иконка закрытия
│   │   ├── MenuIcon/          # Иконка меню
│   │   ├── SearchIcon/        # Иконка поиска
│   │   ├── SettingsIcon/      # Иконка настроек
│   │   ├── TelegramIcon/      # Иконка Telegram
│   │   └── WhatsAppIcon/      # Иконка WhatsApp
│   │
│   ├── 2_blocks/              # Блоки - простые группы атомов
│   │   ├── CommunicationPanel/ # Панель коммуникации
│   │   ├── FeedFoundItem/     # Элемент найденного в ленте
│   │   ├── FeedFoundObjects/  # Найденные объекты в ленте
│   │   ├── FeedSearch/        # Поиск в ленте
│   │   ├── SelectUser/        # Выбор пользователя
│   │   └── SelectUser2/       # Выбор пользователя (v2)
│   │
│   ├── 2_chatinput_elements/  # Элементы ввода чата
│   │   ├── ButtonCommandsSelector/ # Селектор команд
│   │   ├── ButtonEmojiPicker/ # Пикер эмодзи
│   │   ├── ButtonTemplateSelector/ # Селектор шаблонов
│   │   ├── ButtonWabaTemplateSelector/ # Селектор WABA шаблонов
│   │   ├── FilePreview/       # Предпросмотр файлов
│   │   ├── FileUploader/      # Загрузчик файлов
│   │   ├── TemplateSelector/  # Селектор шаблонов
│   │   ├── WABAAttachmentSection/ # Секция WABA вложений
│   │   ├── WABAQuickReplyButtons/ # Быстрые кнопки ответа WABA
│   │   ├── WABASeparatedQuickButtons/ # Разделенные быстрые кнопки
│   │   └── WABATemplateSelector/ # Селектор WABA шаблонов
│   │
│   ├── 2_chatlist_elements/   # Элементы списка чатов
│   │   ├── ChatFilter/        # Фильтр чатов
│   │   ├── ChatItem/          # Элемент чата
│   │   └── ChatTabs/          # Вкладки чатов
│   │
│   ├── 2_elements/            # Общие элементы интерфейса
│   │   ├── AudioRecorder/     # Записыватель аудио
│   │   ├── ChannelSelector/   # Селектор каналов
│   │   ├── ChatInfo/          # Информация о чате
│   │   ├── ChatPanel/         # Панель чата
│   │   ├── ContactInfo/       # Информация о контакте
│   │   ├── ThemeMode/         # Переключатель тем
│   │   ├── UserProfile/      # Профиль пользователя
│   │   └── VideoRecorder/    # Записыватель видео
│   │
│   ├── 2_feed_elements/       # Элементы ленты сообщений
│   │   ├── AudioMessage/      # Аудио сообщение
│   │   ├── BaseReplyMessage/  # Базовое сообщение-ответ
│   │   ├── CallMessage/      # Сообщение о звонке
│   │   ├── DateMessage/       # Сообщение с датой
│   │   ├── DateMessageSticky/ # Закрепленное сообщение с датой
│   │   ├── FeedKeyboard/     # Клавиатура ленты
│   │   ├── FileMessage/       # Файловое сообщение
│   │   ├── ImageMessage/      # Изображение
│   │   ├── MessageKeyboard/  # Клавиатура сообщения
│   │   ├── ReplyAudioMessage/ # Ответ на аудио
│   │   ├── ReplyCallMessage/  # Ответ на звонок
│   │   ├── ReplyFileMessage/  # Ответ на файл
│   │   ├── ReplyImageMessage/ # Ответ на изображение
│   │   ├── ReplyTextMessage/  # Ответ на текст
│   │   ├── ReplyVideoMessage/ # Ответ на видео
│   │   ├── SystemMessage/     # Системное сообщение
│   │   ├── TextMessage/       # Текстовое сообщение
│   │   ├── TypingMessage/     # Индикатор набора текста
│   │   └── VideoMessage/      # Видео сообщение
│   │
│   ├── 2_modals/              # Модальные окна
│   │   ├── CreateChat/        # Создание чата
│   │   ├── CreateChat2/       # Создание чата (v2)
│   │   ├── CreateDialog/      # Создание диалога
│   │   ├── Modal/             # Базовая модалка
│   │   ├── ModalFullscreen/   # Полноэкранная модалка
│   │   ├── ModalNoFooter/     # Модалка без футера
│   │   └── ModalVideoRecorder/ # Модалка записи видео
│   │
│   ├── 3_compounds/           # Сложные компоненты (молекулы)
│   │   ├── ChatInput/         # Ввод чата
│   │   ├── ChatList/          # Список чатов
│   │   ├── Feed/              # Лента сообщений
│   │   └── SideBar/           # Боковая панель
│   │
│   ├── 4_layouts/             # Макеты (организмы)
│   │   ├── AdaptiveExtendedLayout/ # Адаптивный расширенный макет
│   │   ├── BaseLayout/        # Базовый макет
│   │   ├── ChatWrapper/       # Обертка чата
│   │   ├── ExtendedLayout/    # Расширенный макет
│   │   └── FeedLayout/        # Макет ленты
│   │
│   └── 5_containers/          # Контейнеры (шаблоны)
│       ├── BaseContainer/     # Базовый контейнер
│       ├── FloatContainer/    # Плавающий контейнер
│       ├── PlaceholderComponent/ # Компонент-заглушка
│       └── SplashScreen/      # Экран загрузки
│
├── 🎣 hooks/                  # Vue Composition API хуки
│   ├── generatePreview.ts     # Генерация превью файлов
│   ├── getStatusMessage.ts    # Получение статуса сообщения
│   ├── getTypeFileByMime.ts   # Определение типа файла
│   ├── throttle.ts            # Функция троттлинга
│   ├── uploadFile.ts          # Загрузка файлов
│   ├── useDelayDebouncedRef.ts # Отложенный дебаунс
│   ├── useImmediateDebouncedRef.ts # Немедленный дебаунс
│   ├── useMessage.ts          # Хук для работы с сообщениями
│   ├── useModal.ts            # Хук для модальных окон
│   ├── useSearchModel.ts      # Хук для поиска
│   ├── useTheme.ts            # Хук для тем
│   └── useVideoRecorder.ts    # Хук для записи видео
│
├── 🎨 themes/                 # Система тем
│   ├── default/               # Светлая тема
│   ├── dark/                  # Темная тема
│   ├── green/                 # Зеленая тема
│   ├── mobilon1/              # Тема Mobilon
│   ├── index.scss             # Главный файл стилей
│   ├── index.ts               # Экспорт тем
│   └── types.ts               # Типы тем
│
├── 🌐 locale/                 # Локализация
│   ├── en.js                  # Английский язык
│   ├── ru.js                  # Русский язык
│   └── useLocale.js           # Хук локализации
│
└── 📝 types/                  # TypeScript типы
    ├── assets.d.ts            # Типы ресурсов
    ├── components.ts          # Типы компонентов
    ├── IChat.ts               # Интерфейс чата
    ├── IFeedKeyboard.ts       # Интерфейс клавиатуры ленты
    ├── IInputMessage.ts       # Интерфейс входящего сообщения
    ├── index.ts               # Главный экспорт типов
    └── messages.ts            # Типы сообщений
```

## Принципы организации

### 🔢 **Числовая иерархия сложности**
- **1_** - Атомы и иконки (базовые элементы)
- **2_** - Блоки, элементы, модалки (простые группы)
- **3_** - Сложные компоненты (молекулы)
- **4_** - Макеты (организмы)
- **5_** - Контейнеры (шаблоны)

### 🎯 **Почему именно такая структура:**

1. **Atomic Design** - четкая иерархия от простого к сложному
2. **Числовая префиксация** - автоматическая сортировка по сложности
3. **Функциональная группировка** - элементы сгруппированы по назначению
4. **Модульность** - каждый компонент самодостаточен
5. **Переиспользование** - компоненты можно комбинировать в разных приложениях

### 📦 **Структура каждого компонента:**
```
ComponentName/
├── ComponentName.vue          # Основной компонент
├── README.md                  # Документация
├── stories/                   # Storybook истории
│   └── ComponentName.stories.ts
└── styles/                    # Стили компонента
    ├── ComponentName.scss     # Основные стили
    ├── themes/                # Стили для тем
    │   ├── dark.scss
    │   ├── default.scss
    │   └── green.scss
    └── index.ts               # Экспорт стилей
```

### 🚀 **Готовые приложения:**
- **BaseBaseChatApp** - минимальный чат
- **BaseExtendedChatApp** - чат с расширенным функционалом
- **BaseFeedChatApp** - лента сообщений
- **FloatExtendedChatApp** - плавающий чат
- **MobilonExtendedChatApp** - мобильная версия

## Архитектурные решения

### 🏗️ **Слои архитектуры:**

1. **Apps Layer** (`src/apps/`) - Готовые приложения-примеры
   - Демонстрируют различные варианты использования библиотеки
   - Содержат тестовые данные и конфигурации
   - Показывают лучшие практики интеграции

2. **Components Layer** (`src/components/`) - Библиотека компонентов
   - Следует принципам Atomic Design
   - Числовая иерархия сложности (1-5)
   - Каждый компонент самодостаточен

3. **Hooks Layer** (`src/hooks/`) - Бизнес-логика
   - Vue Composition API хуки
   - Переиспользуемая логика
   - Отделение UI от бизнес-логики

4. **Themes Layer** (`src/themes/`) - Система стилей
   - Модульная архитектура тем
   - CSS переменные для динамического переключения
   - Поддержка множественных тем

5. **Types Layer** (`src/types/`) - TypeScript типизация
   - Строгая типизация всех интерфейсов
   - Централизованное управление типами
   - Автокомплит и проверка типов

### 🔄 **Поток данных:**
```
Apps → Components → Hooks → Types
  ↓        ↓         ↓       ↓
Themes ← Styles ← Logic ← Data
```

### ✅ **Преимущества архитектуры:**
- **Масштабируемость** - легко добавлять новые компоненты
- **Переиспользование** - компоненты можно комбинировать
- **Поддержка** - четкая структура упрощает разработку
- **Тестирование** - изолированные компоненты легко тестировать
- **Документация** - каждый компонент имеет README и Storybook

Эта архитектура обеспечивает **масштабируемость**, **переиспользование** и **легкую поддержку** компонентов.
