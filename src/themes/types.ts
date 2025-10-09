/**
 * CSS переменные для тем Chotto
 */
export interface ChottoThemeVariables {
  // Основные цвета
  '--chotto-theme-primary-color': string;
  '--chotto-theme-secondary-color': string;
  '--chotto-theme-tertiary-color': string;
  '--chotto-theme-quaternary-color': string;
  '--chotto-theme-quinary-color': string;
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
  '--chotto-theme-avatar-small-size': string;
  '--chotto-theme-avatar-medium-size': string;

  // Контейнеры
  '--chotto-theme-container-borders': string;

  // Макеты
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
  '--chotto-theme-message-border-radius': string;
  '--chotto-theme-message-modal-padding': string;
  '--chotto-theme-message-modal-border-radius': string;
  '--chotto-theme-message-modal-mask-background': string;
  '--chotto-theme-message-modal-overlay-shadow': string;
  '--chotto-theme-message-modal-bg': string;

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
}

