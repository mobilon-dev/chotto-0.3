/**
 * Цветовая палитра для тем Chotto
 */
export interface ChottoColorPalette {
  // Azure colors
  '--azure-500': string;
  '--azure-600': string;

  // Emerald colors
  '--emerald-50': string;
  '--emerald-100': string;
  '--emerald-200': string;
  '--emerald-300': string;
  '--emerald-400': string;
  '--emerald-450': string;
  '--emerald-500': string;
  '--emerald-600': string;
  '--emerald-700': string;
  '--emerald-800': string;
  '--emerald-900': string;
  '--emerald-950': string;

  // Neutral colors
  '--neutral-50': string;
  '--neutral-75': string;
  '--neutral-90': string;
  '--neutral-100': string;
  '--neutral-125': string;
  '--neutral-150': string;
  '--neutral-200': string;
  '--neutral-250': string;
  '--neutral-300': string;
  '--neutral-400': string;
  '--neutral-500': string;
  '--neutral-550': string;
  '--neutral-600': string;
  '--neutral-700': string;
  '--neutral-800': string;
  '--neutral-850': string;
  '--neutral-900': string;
  '--neutral-950': string;

  // Red colors
  '--p-red-50': string;
  '--p-red-100': string;
  '--p-red-200': string;
  '--p-red-300': string;
  '--p-red-400': string;
  '--p-red-500': string;
  '--p-red-550': string;
  '--p-red-600': string;
  '--p-red-700': string;
  '--p-red-800': string;
  '--p-red-900': string;
  '--p-red-950': string;

  // Coral colors
  '--p-coral-500': string;

  // Default colors
  '--default-white': string;
}

/**
 * CSS переменные для тем Chotto
 */
export interface ChottoThemeVariables {
  // Основные цвета
  '--chotto-theme-primary-color': string;
  '--chotto-theme-secondary-color': string;
  '--chotto-theme-primary-text-color': string;
  '--chotto-theme-secondary-text-color': string;

  // Семантические цвета
  '--chotto-theme-shadow-color': string;
  '--chotto-theme-shadow-light-color': string;
  '--chotto-theme-status-color-received': string;
  '--chotto-theme-status-color-read': string;

  // Типографика
  '--chotto-theme-font-family': string;
  '--chotto-theme-header-font': string;
  '--chotto-theme-header-font-size': string;
  '--chotto-theme-header-font-color': string;
  '--chotto-theme-title-font-size': string;
  '--chotto-theme-text-font-size': string;
  '--chotto-theme-additional-text-font-size': string;
  '--chotto-theme-small-text-font-size': string;
  '--chotto-theme-small-text-font-weight': string | number;
  '--chotto-theme-context-menu-font-size': string;
  '--chotto-theme-header-font-weight': string | number;
  '--chotto-theme-title-font-weight': string | number;
  '--chotto-theme-container-font-weight': string | number;

  // Размеры иконок
  '--chotto-theme-button-icon-size': string;
  '--chotto-theme-text-icon-size': string;
  '--chotto-theme-small-text-icon-size': string;

  // Контейнеры
  '--chotto-theme-container-borders': string;
  '--chotto-theme-float-container-border-radius-header': string;
  '--chotto-theme-float-container-box-shadow': string;
  '--chotto-theme-float-container-bg-header': string;

  // Модальные окна
  '--chotto-theme-modal-padding': string;
  '--chotto-theme-modal-border-radius': string;
  '--chotto-theme-modal-mask-background': string;
  '--chotto-theme-modal-overlay-shadow': string;
  '--chotto-theme-modal-bg': string;

  // Макеты
  '--chotto-theme-layout-extended-third-col-bg': string;
  '--chotto-theme-layout-extended-second-col-bg': string;
  '--chotto-theme-layout-extended-first-col-bg': string;
  '--chotto-theme-layout-extended-first-col-width': string;
  '--chotto-theme-layout-extended-second-col-width': string;
  '--chotto-theme-layout-base-second-col-bg': string;
  '--chotto-theme-layout-base-first-col-bg': string;
  '--chotto-theme-layout-feed-bg': string;

  // Сообщения
  '--chotto-theme-message-right-bg': string;
  '--chotto-theme-message-right-secondary-bg': string;
  '--chotto-theme-message-left-bg': string;
  '--chotto-theme-message-left-secondary-bg': string;
  '--chotto-theme-message-accent-line-color': string;
  '--chotto-theme-message-focused-color': string;
  '--chotto-theme-message-margin': string;
  '--chotto-theme-message-type-icon-bg-color': string;
  '--chotto-theme-message-type-icon-color': string;
  '--chotto-theme-message-popup-info-bg-color': string;
  '--chotto-theme-message-popup-info-color': string;
  '--chotto-theme-message-border-radius': string;

  // Аудио сообщения
  '--chotto-theme-audio-message-transcript-delimiter-color': string;
  '--chotto-theme-audio-message-pbc-background-color': string;
  '--chotto-theme-audio-message-pb-background-color': string;

  // Звонки
  '--chotto-theme-call-message-phone-icon-missed-color': string;

  // Системные сообщения
  '--chotto-theme-system-message-bg-color': string;

  // Кнопки
  '--chotto-theme-button-color-active': string;
  '--chotto-theme-button-color-hover': string;
  '--chotto-theme-button-color-disabled': string;
  '--chotto-theme-action-button-color-active': string;
  '--chotto-theme-action-button-color-hover': string;
  '--chotto-theme-action-button-color-disabled': string;

  // Состояния элементов
  '--chotto-theme-item-background-color-focus': string;
  '--chotto-theme-item-background-color-hover': string;
  '--chotto-theme-item-border-color': string;

  // Непрочитанные сообщения
  '--chotto-theme-unread-background-color': string;
  '--chotto-theme-unread-text-color': string;

  // Полосы прокрутки
  '--chotto-theme-scrollbar-bg': string;
  '--chotto-theme-scrollbar-thumb-bg': string;

  // Дополнительные кнопки
  '--chotto-theme-danger-button-color-active': string;
  '--chotto-theme-danger-button-color-hover': string;
  '--chotto-theme-danger-button-color-disabled': string;
}

