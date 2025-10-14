import type { Meta, StoryObj } from '@storybook/vue3-vite';
import SplashScreen from '../SplashScreen.vue';

const meta: Meta<typeof SplashScreen> = {
  title: 'Feed Elements/SplashScreen',
  component: SplashScreen,
  decorators: [() => ({ template: '<div data-theme="light" style="height: 400px; width: 600px; display: flex; align-items: center; justify-content: center; background: #f5f5f5;"><story/></div>' })]
};

export default meta;
type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
  render: () => ({
    components: { SplashScreen },
    template: `
      <SplashScreen @action="handleAction">
        <template #title>
          <h3>Добро пожаловать!</h3>
        </template>
        <template #text>
          <p>Выберите чат из списка слева, чтобы начать общение</p>
        </template>
        <template #picture>
          <img 
            src="https://via.placeholder.com/200x200/4285f4/ffffff?text=Chat"
            alt="Chat Icon"
            width="200"
            height="200"
          >
        </template>
      </SplashScreen>
    `,
    methods: {
      handleAction() {
        console.log('SplashScreen action triggered');
      }
    }
  })
};

export const EmptyChat: Story = {
  render: () => ({
    components: { SplashScreen },
    template: `
      <SplashScreen @action="handleAction">
        <template #title>
          <h3>Нет сообщений</h3>
        </template>
        <template #text>
          <p>В этом чате пока нет сообщений. Начните разговор!</p>
        </template>
        <template #picture>
          <img 
            src="https://via.placeholder.com/200x200/34a853/ffffff?text=Message"
            alt="Message Icon"
            width="200"
            height="200"
          >
        </template>
      </SplashScreen>
    `,
    methods: {
      handleAction() {
        console.log('Empty chat action triggered');
      }
    }
  })
};

export const NoConnection: Story = {
  render: () => ({
    components: { SplashScreen },
    template: `
      <SplashScreen @action="handleAction">
        <template #title>
          <h3>Нет соединения</h3>
        </template>
        <template #text>
          <p>Проверьте подключение к интернету и попробуйте снова</p>
        </template>
        <template #picture>
          <img 
            src="https://via.placeholder.com/200x200/ea4335/ffffff?text=WiFi"
            alt="WiFi Icon"
            width="200"
            height="200"
          >
        </template>
      </SplashScreen>
    `,
    methods: {
      handleAction() {
        console.log('No connection action triggered');
      }
    }
  })
};

export const Loading: Story = {
  render: () => ({
    components: { SplashScreen },
    template: `
      <SplashScreen @action="handleAction">
        <template #title>
          <h3>Загрузка...</h3>
        </template>
        <template #text>
          <p>Пожалуйста, подождите, данные загружаются</p>
        </template>
        <template #picture>
          <div style="width: 200px; height: 200px; background: #f0f0f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; animation: spin 2s linear infinite;">
            <div style="width: 40px; height: 40px; border: 4px solid #4285f4; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          </div>
        </template>
      </SplashScreen>
    `,
    methods: {
      handleAction() {
        console.log('Loading action triggered');
      }
    },
    mounted() {
      // Добавляем CSS анимацию
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  })
};

export const CustomContent: Story = {
  render: () => ({
    components: { SplashScreen },
    template: `
      <SplashScreen @action="handleAction">
        <template #title>
          <h2 style="color: #9c27b0; margin-bottom: 20px;">Специальное предложение</h2>
        </template>
        <template #text>
          <div style="text-align: center; max-width: 300px;">
            <p style="margin-bottom: 15px;">Получите скидку 50% на премиум функции!</p>
            <button style="background: #9c27b0; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
              Узнать больше
            </button>
          </div>
        </template>
        <template #picture>
          <img 
            src="https://via.placeholder.com/200x200/9c27b0/ffffff?text=Offer"
            alt="Special Offer"
            width="200"
            height="200"
            style="border-radius: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
          >
        </template>
      </SplashScreen>
    `,
    methods: {
      handleAction() {
        console.log('Custom content action triggered');
      }
    }
  })
};

export const Minimal: Story = {
  render: () => ({
    components: { SplashScreen },
    template: `
      <SplashScreen @action="handleAction">
        <template #title>
          <h4>Минималистичный дизайн</h4>
        </template>
        <template #text>
          <p>Простой и чистый интерфейс</p>
        </template>
        <template #picture>
          <div style="width: 100px; height: 100px; background: #666; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
            M
          </div>
        </template>
      </SplashScreen>
    `,
    methods: {
      handleAction() {
        console.log('Minimal action triggered');
      }
    }
  })
};
