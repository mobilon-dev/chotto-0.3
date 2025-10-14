import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ExtendedLayout from '../ExtendedLayout.vue';

const meta: Meta<typeof ExtendedLayout> = {
  title: 'Layouts/ExtendedLayout',
  component: ExtendedLayout,
  decorators: [() => ({ template: '<div data-theme="light" style="height: 500px; width: 1000px;"><story/></div>' })]
};

export default meta;
type Story = StoryObj<typeof ExtendedLayout>;

export const Default: Story = {
  render: () => ({
    components: { ExtendedLayout },
    template: `
      <ExtendedLayout>
        <template #first-col>
          <div style="background: #f0f8ff; padding: 20px; height: 100%; border-right: 2px solid #e0e0e0;">
            <h3>Первая колонка</h3>
            <p>Навигация и меню</p>
            <nav style="margin-top: 20px;">
              <div style="padding: 10px; background: #e3f2fd; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
                📊 Дашборд
              </div>
              <div style="padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
                👥 Пользователи
              </div>
              <div style="padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
                📈 Аналитика
              </div>
            </nav>
          </div>
        </template>
        <template #second-col>
          <div style="background: #f8f8f8; padding: 20px; height: 100%; border-right: 2px solid #e0e0e0;">
            <h3>Вторая колонка</h3>
            <p>Основной контент</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <h4>Карточка контента</h4>
              <p>Здесь отображается основной контент приложения</p>
            </div>
          </div>
        </template>
        <template #third-col>
          <div style="background: #f5f5f5; padding: 20px; height: 100%;">
            <h3>Третья колонка</h3>
            <p>Дополнительная информация</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <h4>Боковая панель</h4>
              <p>Уведомления, настройки, дополнительная информация</p>
            </div>
          </div>
        </template>
      </ExtendedLayout>
    `
  })
};

export const ChatApplication: Story = {
  render: () => ({
    components: { ExtendedLayout },
    template: `
      <ExtendedLayout>
        <template #first-col>
          <div style="background: #2c3e50; color: white; padding: 20px; height: 100%;">
            <h3 style="margin: 0 0 20px 0;">Чаты</h3>
            <div style="background: #34495e; padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
              <strong>Иван Петров</strong>
              <p style="margin: 5px 0; font-size: 14px; opacity: 0.8;">Привет! Как дела?</p>
            </div>
            <div style="background: #3498db; padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
              <strong>Мария Сидорова</strong>
              <p style="margin: 5px 0; font-size: 14px; opacity: 0.8;">Спасибо за помощь!</p>
            </div>
            <div style="background: #34495e; padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
              <strong>Алексей Козлов</strong>
              <p style="margin: 5px 0; font-size: 14px; opacity: 0.8;">До встречи завтра</p>
            </div>
          </div>
        </template>
        <template #second-col>
          <div style="background: white; padding: 20px; height: 100%; display: flex; flex-direction: column;">
            <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
              <h3 style="margin: 0;">Мария Сидорова</h3>
              <p style="margin: 5px 0 0 0; color: #666;">В сети</p>
            </div>
            <div style="flex: 1; background: #f9f9f9; padding: 15px; border-radius: 8px; overflow-y: auto;">
              <div style="margin-bottom: 15px;">
                <div style="background: white; padding: 10px; border-radius: 8px; max-width: 70%;">
                  <p style="margin: 0;">Привет! Как дела с проектом?</p>
                  <small style="color: #999;">14:30</small>
                </div>
              </div>
              <div style="margin-bottom: 15px; text-align: right;">
                <div style="background: #4285f4; color: white; padding: 10px; border-radius: 8px; max-width: 70%; display: inline-block;">
                  <p style="margin: 0;">Все отлично! Почти готово</p>
                  <small style="opacity: 0.8;">14:32</small>
                </div>
              </div>
            </div>
            <div style="margin-top: 15px;">
              <input type="text" placeholder="Введите сообщение..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
            </div>
          </div>
        </template>
        <template #third-col>
          <div style="background: #f0f8ff; padding: 20px; height: 100%;">
            <h4 style="margin: 0 0 20px 0;">Информация о чате</h4>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h5 style="margin: 0 0 15px 0;">Участники</h5>
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; background: #4285f4; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Мария Сидорова</div>
                  <div style="font-size: 12px; color: #666;">Онлайн</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; background: #34a853; border-radius: 50%; margin-right: 12px;"></div>
                <div>
                  <div style="font-weight: bold;">Вы</div>
                  <div style="font-size: 12px; color: #666;">Онлайн</div>
                </div>
              </div>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px;">
              <h5 style="margin: 0 0 15px 0;">Действия</h5>
              <button style="width: 100%; padding: 10px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">
                Поделиться контактом
              </button>
              <button style="width: 100%; padding: 10px; background: #ea4335; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Покинуть чат
              </button>
            </div>
          </div>
        </template>
      </ExtendedLayout>
    `
  })
};

export const Dashboard: Story = {
  render: () => ({
    components: { ExtendedLayout },
    template: `
      <ExtendedLayout>
        <template #first-col>
          <div style="background: #2c3e50; color: white; padding: 20px; height: 100%;">
            <h3 style="margin: 0 0 20px 0;">Навигация</h3>
            <nav>
              <div style="padding: 10px; background: #34495e; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
                📊 Дашборд
              </div>
              <div style="padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
                👥 Пользователи
              </div>
              <div style="padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
                📈 Аналитика
              </div>
              <div style="padding: 10px; border-radius: 5px; margin-bottom: 10px; cursor: pointer;">
                ⚙️ Настройки
              </div>
            </nav>
          </div>
        </template>
        <template #second-col>
          <div style="background: #ecf0f1; padding: 20px; height: 100%;">
            <h2 style="margin: 0 0 20px 0;">Дашборд</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <h3 style="color: #e74c3c; margin: 0;">1,234</h3>
                <p style="margin: 5px 0 0 0;">Всего пользователей</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <h3 style="color: #27ae60; margin: 0;">56</h3>
                <p style="margin: 5px 0 0 0;">Активных сессий</p>
              </div>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3>Последняя активность</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Новый пользователь зарегистрирован</li>
                <li>Обновлена система безопасности</li>
                <li>Завершено резервное копирование</li>
              </ul>
            </div>
          </div>
        </template>
        <template #third-col>
          <div style="background: #f8f9fa; padding: 20px; height: 100%;">
            <h4 style="margin: 0 0 20px 0;">Уведомления</h4>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #4285f4;">
              <h5 style="margin: 0 0 10px 0;">Системное обновление</h5>
              <p style="margin: 0; font-size: 14px; color: #666;">Запланировано на завтра в 02:00</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #34a853;">
              <h5 style="margin: 0 0 10px 0;">Резервное копирование</h5>
              <p style="margin: 0; font-size: 14px; color: #666;">Успешно завершено</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ea4335;">
              <h5 style="margin: 0 0 10px 0;">Предупреждение</h5>
              <p style="margin: 0; font-size: 14px; color: #666;">Высокая нагрузка на сервер</p>
            </div>
          </div>
        </template>
      </ExtendedLayout>
    `
  })
};
