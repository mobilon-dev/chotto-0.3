# Публикация пакета

## Подготовка

- Обновите версию в `package.json`
- Убедитесь, что сборка и типы собираются корректно
- Проверьте Storybook и валидацию тем

## Команды

```bash
npm run build
npm run validate-themes
npm run build-storybook
```

## Публикация в npm

```bash
npm publish --access public
```

## Проверка

- Откройте docs (собранный Storybook)
- Протестируйте установку пакета в чистом проекте

