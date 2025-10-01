/**
 * CSS переменные для компонента BaseContainer
 */
export interface BaseContainerThemeCSSVariables {
  // Base container
  /** Переход базового контейнера */
  '--chotto-basecontainer-base-container-transition': string;
  /** Жирность шрифта базового контейнера */
  '--chotto-basecontainer-base-container-font-weight': string;
  /** Цвет базового контейнера */
  '--chotto-basecontainer-base-container-color': string;
  /** Семейство шрифтов базового контейнера */
  '--chotto-basecontainer-base-container-font-family': string;
  /** Контейнерный запрос базового контейнера */
  '--chotto-basecontainer-base-container-container': string;
  /** Минимальная ширина базового контейнера */
  '--chotto-basecontainer-base-container-min-width': string;

  // Global styles
  /** Размер коробки глобальных стилей */
  '--chotto-basecontainer-global-box-sizing': string;
  /** Отступы body глобальных стилей */
  '--chotto-basecontainer-global-body-margin': string;
  /** Отступы ul глобальных стилей */
  '--chotto-basecontainer-global-ul-margin': string;
  /** Отступы ul глобальных стилей */
  '--chotto-basecontainer-global-ul-padding': string;
  /** Тип маркера списка ul глобальных стилей */
  '--chotto-basecontainer-global-ul-list-style-type': string;
  /** Семейство шрифтов input и button глобальных стилей */
  '--chotto-basecontainer-global-input-button-font-family': string;
  /** Отступы p, h1, h2 глобальных стилей */
  '--chotto-basecontainer-global-p-h1-h2-margin': string;
  /** Декорация текста ссылок глобальных стилей */
  '--chotto-basecontainer-global-a-text-decoration': string;

  // Transition
  /** Переход анимации входа */
  '--chotto-basecontainer-transition-enter-active-transition': string;
  /** Прозрачность анимации входа */
  '--chotto-basecontainer-transition-enter-active-opacity': string;
  /** Прозрачность анимации выхода */
  '--chotto-basecontainer-transition-enter-from-opacity': string;
}
